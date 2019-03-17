import { SET_MANUAL, CLEAR_MANUAL, LOAD_MANUAL, ADJUST_START_DATE, ADJUST_END_DATE, SET_SELECTED_DATE, CLEAR_SELECTED_DATE } from "../constants/action-types";
import { TRAITS } from "../constants/traits";

const startState = {
    startDate: 7,
    endDate: 25,
    manual: {},
    dates: {},
    selectedDate: -1
};

function rootReducer(state = startState, action) {
    if (action.type === SET_MANUAL) {
        let newValue = action.newValue

        // if trying to set to an odd number, AND it isn't fascination,
        // we'll force it to round down
        if (action.trait !== "fascination" && newValue % 2 === 1) {
            newValue = newValue - 1;
        }

        let newManual = Object.assign({}, {
            ...state.manual,
            [action.intDate]: {
                ...state.manual[action.intDate],
                [action.trait]: [newValue, action.newDecay]
            }
        });

        let newDates = recalculateDates(newManual, state.startDate, state.endDate);

        // update local storage
        saveToLocalStorage(newManual, state.startDate, state.endDate, state.selectedDate);

        return Object.assign({}, state, {
            manual: newManual,
            dates: newDates
        });
    }

    if (action.type === CLEAR_MANUAL) {
        let revisedDate = state.manual[action.intDate]
        delete revisedDate[action.trait];

        let newManual = Object.assign({}, {
            ...state.manual,
            [action.intDate]: revisedDate
        });

        // also eliminate this manual entry if it is now empty
        if (Object.entries(revisedDate).length === 0) {
            delete newManual[action.intDate];
        }

        let newDates = recalculateDates(newManual, state.startDate, state.endDate);

        // update local storage
        saveToLocalStorage(newManual, state.startDate, state.endDate, state.selectedDate);

        return Object.assign({}, state, {
            manual: newManual,
            dates: newDates
        });
    }

    if (action.type === LOAD_MANUAL) {
        let newManual = Object.assign({}, action.manualSet);

        let newDates = recalculateDates(newManual, action.startDate, action.endDate);

        // DO NOT update local storage; we should only use this for
        // loading from existing local storage

        return Object.assign({}, state, {
            manual: newManual,
            dates: newDates,
            startDate: action.startDate,
            endDate: action.endDate,
            selectedDate: action.selectedDate
        });
    }

    if (action.type === ADJUST_START_DATE) {
        let newStartDate = state.startDate + action.delta
        if (newStartDate < 0) {
            newStartDate = 0;
        }
        if (newStartDate > state.endDate) {
            newStartDate = state.endDate - 1;
        }

        let newDates = recalculateDates(state.manual, newStartDate, state.endDate);

        // update local storage
        saveToLocalStorage(state.manual, newStartDate, state.endDate, state.selectedDate);

        return Object.assign({}, state, {
            startDate: newStartDate,
            dates: newDates
        })
    }

    if (action.type === ADJUST_END_DATE) {
        let newEndDate = state.endDate + action.delta
        if (newEndDate < 0) {
            newEndDate = 0;
        }
        if (newEndDate < state.startDate) {
            newEndDate = state.startDate + 1;
        }

        let newDates = recalculateDates(state.manual, state.startDate, newEndDate);

        // update local storage
        saveToLocalStorage(state.manual, state.startDate, newEndDate, state.selectedDate);

        return Object.assign({}, state, {
            endDate: newEndDate,
            dates: newDates
        })
    }

    if (action.type === SET_SELECTED_DATE) {
        // make sure value is a valid int
        let newSelectedDate = parseInt(action.intDate, 10)
        if (isNaN(newSelectedDate) || newSelectedDate < 0) {
            newSelectedDate = -1
        }

        // update local storage
        saveToLocalStorage(state.manual, state.startDate, state.endDate, newSelectedDate);

        return Object.assign({}, state, {
            selectedDate: newSelectedDate
        })
    }

    if (action.type === CLEAR_SELECTED_DATE) {
        // update local storage
        saveToLocalStorage(state.manual, state.startDate, state.endDate, -1);

        return Object.assign({}, state, {
            selectedDate: -1
        })
    }

    return state;
}

function saveToLocalStorage(manual, startDate, endDate, selectedDate) {
    let saveState = {
        manual,
        startDate,
        endDate,
        selectedDate
    }
    window.localStorage.setItem("saveState", JSON.stringify(saveState))
}

// updates a single trait for a single day within a local
// dates object (e.g., does not itself set state), based on
// the values on the prior day within that date object.
function updateValueForTraitOnDate(datesObj, intDate, trait) {
    // if the intDate is <= 0, bail, we can't go any earlier
    if (intDate <= 0) {
        return;
    }

    // if today was manually set, just go with that
    let dToday = datesObj[intDate]
    if (dToday) {
        let traitToday = dToday[trait]
        if (traitToday) {
            // was this trait manually set today?
            if (traitToday[2]) {
                // it was, so keep its value and exit
                return;
            }
        }
    }

    // get the date object for the day before
    let dYest = datesObj[intDate - 1]
    if (!dYest) {
        // not found, record 0 here and bail
        if (!(datesObj[intDate])) {
            // also don't have anything for today, so make a new one
            datesObj[intDate] = {
                [trait]: [0, 0, false]
            };
        } else {
            datesObj[intDate] = {
                ...datesObj[intDate],
                [trait]: [0, 0, false]
            };
        }
        return;
    }

    // get the value for this trait from yesterday
    let tVal = dYest[trait]
    if (!tVal) {
        // no value yesterday, record 0 here and bail
        datesObj[intDate] = {
            ...datesObj[intDate],
            [trait]: [0, 0, false]
        };
        return;
    }

    // now, decide how to set today's trait values based
    // on yesterday's value and decay
    let newDecay = tVal[1] - 1;
    if (newDecay < 0) {
        newDecay = 0;
    }
    if (trait === "change") {
        // don't do anything, change never decays
        datesObj[intDate] = {
            ...datesObj[intDate],
            [trait]: [tVal[0], 0, false]
        };
    } else if (newDecay > 0) {
        // we haven't decayed, so use the same trait value
        // and just decrement the decay
        datesObj[intDate] = {
            ...datesObj[intDate],
            [trait]: [tVal[0], newDecay, false]
        };
    } else {
        // we've decayed, so adjust the trait value and
        // reset the decay to what it should be, each
        // depending on the trait
        let newValue;
        if (tVal[0] === 0) {
            newValue = 0;
            newDecay = 0;
        } else {
            if (trait === "fascination") {
                newValue = tVal[0] - 1;
                newDecay = 7;
            } else {
                newValue = Math.floor(tVal[0] / 2);
                // if it's an odd number, round down
                if (newValue % 2 === 1) {
                    newValue = newValue - 1;
                }
                newDecay = 3;
            }
            // if our trait value is now 0, decay should also
            // be 0 so we stop recounting
            if (newValue === 0) {
                newDecay = 0;
            }
        }
        datesObj[intDate] = {
            ...datesObj[intDate],
            [trait]: [newValue, newDecay, false]
        };
    }
}

function recalculateDates(newManual, startDate, endDate) {
    // first, create a dates object with the new Manual values
    let dates = {};

    // walk through and create new vals with true for 3rd item
    // also track what is our min and max date
    let minDate = 999999;
    let maxDate = 0;
    const manualIntDates = Object.keys(newManual);
    for (let i = 0; i < manualIntDates.length; i++) {
        let d = parseInt(manualIntDates[i], 10);
        if (d < minDate) {
            minDate = d;
        }
        if (d > maxDate) {
            maxDate = d;
        }
        let newDate = {};
        const manualTraits = Object.keys(newManual[d]);
        for (let j = 0; j < manualTraits.length; j++) {
            let trait = manualTraits[j];
            let traitVals = newManual[d][trait]
            newDate[trait] = [traitVals[0], traitVals[1], true];
        }

        // newDate's traits are now filled in; add to new object
        dates[d] = newDate;
    }

    // we should be able to walk through in order, starting with
    // the earliest date and continuing until the requested
    // end date.
    let firstDateRow = Math.min(minDate, startDate)
    let lastDateRow = Math.max(maxDate, endDate)
    for (let iter = firstDateRow; iter <= lastDateRow; iter++) {
        for (let t = 0; t < TRAITS.length; t++) {
            updateValueForTraitOnDate(dates, iter, TRAITS[t]);
        }
    }

    // finally, at the end, return the outcom
    return dates;
}

export default rootReducer;