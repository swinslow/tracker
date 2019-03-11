import React, { Component } from 'react'
import { connect } from "react-redux";
import { Table } from 'semantic-ui-react';
import ManualMarker from './manualMarker';
import { setManual } from "../actions";

function mapDispatchToProps(dispatch) {
    return {
        setManual: (intDate, trait, newValue, newDecay) => dispatch(setManual(intDate, trait, newValue, newDecay))
    };
}

class ConnectedDayCell extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false,
            editContents: ""
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    makeValue() {
        if (this.state.editing === true) {
            return (
                <span>
                    <form onSubmit={this.handleSubmit}>
                        <input value={this.state.editContents}
                               onChange={event => this.onInputChange(event.target.value)} />
                    </form>
                </span>
            )
        } else {
            return (
                <span>{this.props.traitVals[0]} {this.checkMarker()}</span>
            )
        }
    }

    checkMarker() {
        if (this.props.traitVals[2] === true) {
            return <ManualMarker intDate={this.props.intDate} trait={this.props.trait}/>
        }
    }

    handleClick(event) {
        event.preventDefault()
        if (this.state.editing === false) {
            console.log("Clicked on "+ this.props.trait + ", date " + this.props.intDate)
            this.setState({
                editing: true,
                editContents: this.props.traitVals[0].toString()
            })
        }
    }

    onInputChange(editContents) {
        this.setState({editContents})
    }

    handleSubmit(event) {
        event.preventDefault()
        let newValue = Number.parseInt(this.state.editContents)
        console.log("Submitting manual value: " + this.props.trait + ", value " + newValue + ", date " + this.props.intDate)

        // figure out correct decay value
        let newDecay;
        if (newValue === 0) {
            newDecay = 0;
        } else if (this.props.trait === "fascination") {
            newDecay = 7;
        } else {
            newDecay = 3;
        }

        this.props.setManual(this.props.intDate, this.props.trait, newValue, newDecay)

        // and reset / stop editing
        this.setState({
            editing: false,
            editContents: ""
        })
    }

    render() {
        return (
            <Table.Cell selectable onClick={this.handleClick} textAlign="center">{this.makeValue()}</Table.Cell>
        );
    }
}

const DayCell = connect(null, mapDispatchToProps) (ConnectedDayCell);

export default DayCell;
