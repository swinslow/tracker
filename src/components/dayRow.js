import React, { Component } from 'react'
import { connect } from "react-redux";
import { Label, Table } from 'semantic-ui-react';
import DayCell from './dayCell.js';
import { getCalendarStringFromIntDate } from '../utils/calendar';
import { setSelectedDate, clearSelectedDate } from "../actions";

function mapDispatchToProps(dispatch) {
    return {
        setSelectedDate: (intDate) => dispatch(setSelectedDate(intDate)),
        clearSelectedDate: () => dispatch(clearSelectedDate()),
    };
}

class ConnectedDayRow extends Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    getDateCell() {
        if (this.props.isSelectedDate) {
            return <Table.Cell onClick={this.handleClick} singleLine><Label color="teal">{getCalendarStringFromIntDate(this.props.intDate)}</Label></Table.Cell>
        } else {
            return <Table.Cell onClick={this.handleClick} singleLine>{getCalendarStringFromIntDate(this.props.intDate)}</Table.Cell>
        }
    }

    handleClick(event) {
        event.preventDefault()
        if (this.props.isSelectedDate) {
            // clear the selected date
            this.props.clearSelectedDate()
        } else {
            // set the selected date
            this.props.setSelectedDate(this.props.intDate)
        }
    }

    render() {
        return (
            <Table.Row>
                {this.getDateCell()}
                <DayCell intDate={this.props.intDate} trait="blade" traitVals={this.props.traits["blade"]} />
                <DayCell intDate={this.props.intDate} trait="calm" traitVals={this.props.traits["calm"]} />
                <DayCell intDate={this.props.intDate} trait="chaos" traitVals={this.props.traits["chaos"]} />
                <DayCell intDate={this.props.intDate} trait="death" traitVals={this.props.traits["death"]} />
                <DayCell intDate={this.props.intDate} trait="eye" traitVals={this.props.traits["eye"]} />
                <DayCell intDate={this.props.intDate} trait="hunger" traitVals={this.props.traits["hunger"]} />
                <DayCell intDate={this.props.intDate} trait="key" traitVals={this.props.traits["key"]} />
                <DayCell intDate={this.props.intDate} trait="life" traitVals={this.props.traits["life"]} />
                <DayCell intDate={this.props.intDate} trait="prime" traitVals={this.props.traits["prime"]} />
                <DayCell intDate={this.props.intDate} trait="fascination" traitVals={this.props.traits["fascination"]} />
                <DayCell intDate={this.props.intDate} trait="change" traitVals={this.props.traits["change"]} />
            </Table.Row>
        )
    }
}

const DayRow = connect(null, mapDispatchToProps) (ConnectedDayRow)

export default DayRow;
