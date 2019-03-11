import React from 'react'
import { Table } from 'semantic-ui-react';
import ManualMarker from './manualMarker';

function checkMarker(traits) {
    if (traits[2] === true) {
        return <ManualMarker />
    }
}

function DayCell(props) {
    return (
        <Table.Cell textAlign="center">{props.traitVals[0]} {checkMarker(props.traitVals)}</Table.Cell>
    )
}

export default DayCell;
