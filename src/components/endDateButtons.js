import React, { Component } from 'react'
import { connect } from "react-redux";
import { Button } from 'semantic-ui-react';
import { adjustEndDate } from "../actions";

function mapDispatchToProps(dispatch) {
    return {
        adjustEndDate: (delta) => dispatch(adjustEndDate(delta))
    };
}

class ConnectedEndDateButtons extends Component {
    render() {
        return (
            <span>
                <Button onClick={e => {
                    e.preventDefault()
                    this.props.adjustEndDate(-1)
                }}>End sooner</Button>
                <Button onClick={e => {
                    e.preventDefault()
                    this.props.adjustEndDate(1)
                }}>End later</Button>
            </span>
        )
    }
}

const EndDateButtons = connect(null, mapDispatchToProps) (ConnectedEndDateButtons);

export default EndDateButtons;
