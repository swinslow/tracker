import { SET_MANUAL, CLEAR_MANUAL, LOAD_MANUAL } from "../constants/action-types";

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

export const loadManual = (manualSet) => ({
    type: LOAD_MANUAL,
    manualSet: manualSet
})
