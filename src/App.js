import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Table } from 'semantic-ui-react';
import './App.css';
import DayRows from './components/dayRows';
import StartDateButtons from './components/startDateButtons';
import EndDateButtons from './components/endDateButtons';

class App extends Component {


  componentDidMount() {
    let manualSet = JSON.parse(window.localStorage.getItem("manual"))
    this.props.store.dispatch({
      type: "LOAD_MANUAL",
      manualSet
    })
  }

  render() {
    return (
      <div className="App">
        <h2>Dates</h2>
        <StartDateButtons />
        <EndDateButtons />
        <Table fixed celled striped compact="very">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center">Date</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Blade</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Calm</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Chaos</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Death</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Eye</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Hunger</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Key</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Life</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Prime</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Fascination</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <DayRows />
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default App;
