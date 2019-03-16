import React from 'react'
import { Table } from 'semantic-ui-react';
import DayCell from './dayCell.js';

function DayRow(props) {
    return (
        <Table.Row>
            <Table.Cell>{props.intDate}</Table.Cell>
            <DayCell intDate={props.intDate} trait="blade" traitVals={props.traits["blade"]} />
            <DayCell intDate={props.intDate} trait="calm" traitVals={props.traits["calm"]} />
            <DayCell intDate={props.intDate} trait="chaos" traitVals={props.traits["chaos"]} />
            <DayCell intDate={props.intDate} trait="death" traitVals={props.traits["death"]} />
            <DayCell intDate={props.intDate} trait="eye" traitVals={props.traits["eye"]} />
            <DayCell intDate={props.intDate} trait="hunger" traitVals={props.traits["hunger"]} />
            <DayCell intDate={props.intDate} trait="key" traitVals={props.traits["key"]} />
            <DayCell intDate={props.intDate} trait="life" traitVals={props.traits["life"]} />
            <DayCell intDate={props.intDate} trait="prime" traitVals={props.traits["prime"]} />
            <DayCell intDate={props.intDate} trait="fascination" traitVals={props.traits["fascination"]} />
        </Table.Row>
    )
}

export default DayRow;
