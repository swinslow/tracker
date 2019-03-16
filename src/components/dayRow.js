import React from 'react'
import { Table } from 'semantic-ui-react';
import DayCell from './dayCell.js';
import { getCalendarStringFromIntDate } from '../utils/calendar';

function DayRow(props) {
    return (
        <Table.Row>
            <Table.Cell singleLine>{getCalendarStringFromIntDate(props.intDate)}</Table.Cell>
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
            <DayCell intDate={props.intDate} trait="change" traitVals={props.traits["change"]} />
        </Table.Row>
    )
}

export default DayRow;
