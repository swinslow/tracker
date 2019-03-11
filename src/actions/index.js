import { SET_MANUAL, CLEAR_MANUAL, LOAD_MANUAL } from "../constants/action-types";

function setManual(intDate, trait, newValue, newDecay) {
    return {
        type: SET_MANUAL,
        intDate: intDate,
        trait: trait,
        newValue: newValue,
        newDecay: newDecay
    };
}

function clearManual(intDate, trait) {
    return {
        type: CLEAR_MANUAL,
        intDate: intDate,
        trait: trait
    };
}

function loadManual(manualSet) {
    return {
        type: LOAD_MANUAL,
        manualSet: manualSet
    };
}

export default { setManual, clearManual, loadManual }
