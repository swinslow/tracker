import React, { Component } from 'react'
import { connect } from "react-redux";
import { Button } from 'semantic-ui-react';
import { adjustStartDate } from "../actions";

function mapDispatchToProps(dispatch) {
    return {
        adjustStartDate: (delta) => dispatch(adjustStartDate(delta))
    };
}

class ConnectedStartDateButtons extends Component {
    render() {
        return (
            <span>
                <Button onClick={e => {
                    e.preventDefault()
                    this.props.adjustStartDate(-1)
                }}>Start sooner</Button>
                <Button onClick={e => {
                    e.preventDefault()
                    this.props.adjustStartDate(1)
                }}>Start later</Button>
            </span>
        )
    }
}

const StartDateButtons = connect(null, mapDispatchToProps) (ConnectedStartDateButtons);

export default StartDateButtons;
