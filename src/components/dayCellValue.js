import React, { Component } from 'react'
import { connect } from "react-redux";
import { Button, Form, Input } from 'semantic-ui-react';
import { setManual } from "../actions";

function mapDispatchToProps(dispatch) {
    return {
        setManual: (intDate, trait, newValue, newDecay) => dispatch(setManual(intDate, trait, newValue, newDecay))
    };
}

class ConnectedDayCellValue extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false,
            editContents: ""
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleClick(event) {
        event.preventDefault()
        if (this.state.editing === false) {
            this.setState({
                editing: true,
                editContents: this.props.traitVals[0].toString()
            })
        }
    }

    handleCancel(event) {
        event.preventDefault()
        this.setState({
            editing: false,
            editContents: ""
        })
    }

    onInputChange(editContents) {
        this.setState({editContents})
    }

    handleSubmit(event) {
        event.preventDefault()
        let newValue = Number.parseInt(this.state.editContents)
        if (Number.isNaN(newValue) || newValue < 0) {
            newValue = 0;
        }

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
        if (this.state.editing === true) {
            return (
                <span>
                    <Form onSubmit={this.handleSubmit}>
                        <Input value={this.state.editContents}
                               onChange={event => this.onInputChange(event.target.value)} />
                        <Button size="mini" type="submit" content="Submit" />
                        <Button size="mini" onClick={this.handleCancel}>X</Button>
                    </Form>
                </span>
            )
        } else {
            return (
                <span onClick={this.handleClick}>{this.props.traitVals[0]}</span>
            )
        }
    }
}

const DayCellValue = connect(null, mapDispatchToProps) (ConnectedDayCellValue);

export default DayCellValue;
