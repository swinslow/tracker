import { SET_MANUAL, CLEAR_MANUAL, LOAD_MANUAL } from "../constants/action-types";
import { TRAITS } from "../constants/traits";

const startState = {
    startDate: 7,
    endDate: 25,
    manual: {},
    dates: {}
};

function rootReducer(state = startState, action) {
    if (action.type === SET_MANUAL) {
        let newManual = Object.assign({}, {
            ...state.manual,
            [action.intDate]: {
                ...state.manual[action.intDate],
                [action.trait]: [action.newValue, action.newDecay]
            }
        });

        let newDates = recalculateDates(newManual, state.startDate, state.endDate);

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

        let newDates = recalculateDates(newManual, state.startDate, state.endDate);

        return Object.assign({}, state, {
            manual: newManual,
            dates: newDates
        });
    }

    if (action.type === LOAD_MANUAL) {
        let newManual = Object.assign({}, action.manualSet);

        let newDates = recalculateDates(newManual, state.startDate, state.endDate);

        return Object.assign({}, state, {
            manual: newManual,
            dates: newDates
        });
    }

    return state;
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
        datesObj[intDate] = {
            ...datesObj[intDate],
            [trait]: [0, 0, false]
        };
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
    if (newDecay > 0) {
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
        let d = manualIntDates[i];
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
    for (let iter = startDate; iter <= endDate; iter++) {
        for (let t = 0; t < TRAITS.length; t++) {
            updateValueForTraitOnDate(dates, iter, TRAITS[t]);
        }
    }

    // finally, at the end, return the outcom
    return dates;
}

export default rootReducer;