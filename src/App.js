import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Table } from 'semantic-ui-react';
import './App.css';
import DayRows from './components/dayRows.js';

class App extends Component {


  componentDidMount() {
    const manualSet = {
      9: {
          "blade": [8, 3]
      },
      11: {
          "calm": [12, 3]
      }
    }
    this.props.store.dispatch({
      type: "LOAD_MANUAL",
      manualSet
    })

    this.props.store.dispatch({
      type: "SET_MANUAL",
      intDate: 11,
      trait: "blade",
      newValue: 4,
      newDecay: 3
    })

    this.props.store.dispatch({
      type: "SET_MANUAL",
      intDate: 7,
      trait: "blade",
      newValue: 17,
      newDecay: 3
    })

    this.props.store.dispatch({
      type: "CLEAR_MANUAL",
      intDate: 9,
      trait: "blade"
    })
//     this.resetDatesWithManual()

// //    this.clearManualValue(9, "blade");
//     this.setManualValue(15, "blade", 14, 3);
  }

  render() {
    return (
      <div className="App">
        <h2>Dates</h2>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Blade</Table.HeaderCell>
              <Table.HeaderCell>Calm</Table.HeaderCell>
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
