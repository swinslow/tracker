import React from 'react'
import { Table } from 'semantic-ui-react';
import DayCell from './dayCell.js';

function DayRow(props) {
    return (
        <Table.Row>
            <Table.Cell>{props.intDate}</Table.Cell>
            <DayCell traitVals={props.traits["blade"]} />
            <DayCell traitVals={props.traits["calm"]} />
        </Table.Row>
    )
}

export default DayRow;
