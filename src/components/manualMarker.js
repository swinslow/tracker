import React, { Component } from 'react'
import { connect } from "react-redux";
import { clearManual } from "../actions";

function mapDispatchToProps(dispatch) {
    return {
        clearManual: (intDate, trait) => dispatch(clearManual(intDate, trait))
    };
}

class ConnectedManualMarker extends Component {
    constructor() {
        super();

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault();
        console.log("calling clearManual: " + this.props.intDate + ", " + this.props.trait);
        this.props.clearManual(this.props.intDate, this.props.trait);
    }

    render() {
        return (
            <span onClick={this.handleClick}>(M)</span>
        )
    }
}

const ManualMarker = connect(null, mapDispatchToProps) (ConnectedManualMarker);

export default ManualMarker;
