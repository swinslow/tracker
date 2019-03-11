import React, { Component } from 'react'
import { Table } from 'semantic-ui-react';
import ManualMarker from './manualMarker';
import DayCellValue from './dayCellValue';

class DayCell extends Component {
    checkMarker() {
        if (this.props.traitVals[2] === true) {
            return <ManualMarker intDate={this.props.intDate} trait={this.props.trait}/>
        }
    }

    render() {
        return (
            <Table.Cell textAlign="center">
                <DayCellValue intDate={this.props.intDate} trait={this.props.trait} traitVals={this.props.traitVals} />&nbsp;
                {this.checkMarker()}
            </Table.Cell>
        );
    }
}

export default DayCell;
