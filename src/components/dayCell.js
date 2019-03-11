import React from 'react'
import { Table } from 'semantic-ui-react';
import ManualMarker from './manualMarker';

function checkMarker(traits, intDate, traitName) {
    if (traits[2] === true) {
        return <ManualMarker intDate={intDate} trait={traitName}/>
    }
}

function DayCell(props) {
    return (
        <Table.Cell textAlign="center">{props.traitVals[0]} {checkMarker(props.traitVals, props.intDate, props.trait)}</Table.Cell>
    )
}

export default DayCell;
