import React, { Component } from 'react'
import { Table } from 'semantic-ui-react';
import ManualMarker from './manualMarker';

class DayCell extends Component {
    constructor(props) {
        super(props);

        this.logResult = this.logResult.bind(this);
    }

    checkMarker() {
        if (this.props.traitVals[2] === true) {
            return <ManualMarker intDate={this.props.intDate} trait={this.props.trait}/>
        }
    }

    logResult(event) {
        event.preventDefault()
        console.log("Clicked on "+ this.props.trait + ", date " + this.props.intDate)
    }

    render() {
        return (
            <Table.Cell selectable onClick={this.logResult} textAlign="center">{this.props.traitVals[0]} {this.checkMarker()}</Table.Cell>
        );
    }
}

export default DayCell;
