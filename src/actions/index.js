import { SET_MANUAL, CLEAR_MANUAL, LOAD_MANUAL, ADJUST_START_DATE, ADJUST_END_DATE, SET_SELECTED_DATE, CLEAR_SELECTED_DATE } from "../constants/action-types";

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

export const loadManual = (manualSet, startDate, endDate, selectedDate) => ({
    type: LOAD_MANUAL,
    manualSet,
    startDate,
    endDate,
    selectedDate
})

export const adjustStartDate = (delta) => ({
    type: ADJUST_START_DATE,
    delta: delta
})

export const adjustEndDate = (delta) => ({
    type: ADJUST_END_DATE,
    delta: delta
})

export const setSelectedDate = (intDate) => ({
    type: SET_SELECTED_DATE,
    intDate: intDate
})

export const clearSelectedDate = () => ({
    type: CLEAR_SELECTED_DATE
})
