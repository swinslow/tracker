import { SET_MANUAL, CLEAR_MANUAL, LOAD_MANUAL, ADJUST_START_DATE, ADJUST_END_DATE } from "../constants/action-types";

export const setManual = (intDate, trait, newValue, newDecay) => ({
    type: SET_MANUAL,
    intDate: intDate,
    trait: trait,
    newValue: newValue,
    newDecay: newDecay
})

export const clearManual = (intDate, trait) => ({
    type: CLEAR_MANUAL,
    intDate: intDate,
    trait: trait
})

export const loadManual = (manualSet, startDate, endDate) => ({
    type: LOAD_MANUAL,
    manualSet: manualSet,
    startDate: startDate,
    endDate: endDate
})

export const adjustStartDate = (delta) => ({
    type: ADJUST_START_DATE,
    delta: delta
})

export const adjustEndDate = (delta) => ({
    type: ADJUST_END_DATE,
    delta: delta
})
