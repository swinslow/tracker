import React from 'react'
import { Table } from 'semantic-ui-react';
import DayCell from './dayCell.js';

function DayRow(props) {
    return (
        <Table.Row>
            <Table.Cell>{props.intDate}</Table.Cell>
            <DayCell traitVals={props.traits["blade"]} />
            <DayCell traitVals={props.traits["calm"]} />
            <DayCell traitVals={props.traits["chaos"]} />
            <DayCell traitVals={props.traits["death"]} />
            <DayCell traitVals={props.traits["eye"]} />
            <DayCell traitVals={props.traits["fascination"]} />
            <DayCell traitVals={props.traits["hunger"]} />
            <DayCell traitVals={props.traits["key"]} />
            <DayCell traitVals={props.traits["life"]} />
            <DayCell traitVals={props.traits["prime"]} />
        </Table.Row>
    )
}

export default DayRow;
