import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Table } from 'semantic-ui-react';
import './App.css';
import DayRows from './components/dayRows';
import StartDateButtons from './components/startDateButtons';
import EndDateButtons from './components/endDateButtons';

class App extends Component {

  componentDidMount() {
    let saveState = JSON.parse(window.localStorage.getItem("saveState"))
    if (saveState) {
      this.props.store.dispatch({
        type: "LOAD_MANUAL",
        manualSet: saveState["manual"],
        startDate: saveState["startDate"],
        endDate: saveState["endDate"],
        selectedDate: saveState["selectedDate"]
      })
    } else {
      this.props.store.dispatch({
        type: "LOAD_MANUAL",
        manualSet: {},
        startDate: 123,
        endDate: 152,
        selectedDate: -1
      })
    }
  }

  render() {
    return (
      <div className="App">
        <h2>Influence Tracker</h2>
        <StartDateButtons />
        <EndDateButtons />
        <Table celled fixed striped definition compact="very">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width='three' textAlign="center">Date</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Blade</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Calm</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Chaos</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Death</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Eye</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Hunger</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Key</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Life</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Prime</Table.HeaderCell>
              <Table.HeaderCell color="red" textAlign="center">Fascination</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Change</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <DayRows />
          </Table.Body>
        </Table>
        <hr />
        <h6>Licensed under <a href="https://blueoakcouncil.org/license/1.0.0">the Blue Oak Model License, version 1.0.0</a>.</h6>
      </div>
    );
  }
}

export default App;
