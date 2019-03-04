import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import DayRow from './dayRow.js';
import { Table } from 'semantic-ui-react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: 7,
      endDate: 15,
      manual: {
        7: {
          "calm": [4, 3]
        },
        9: {
          "blade": [8, 3]
        }
      },
      dates: {
        /*7: {
          "calm": [4, 3, true]
        },
        8: {
          "calm": [4, 2, false]
        },
        9: {
          "blade": [8, 3, true],
          "calm": [4, 1, false]
        },
        10: {
          "blade": [8, 2, false],
          "calm": [2, 3, false]
        }*/
      }
    }
  }

  componentDidMount() {
    // first, create dates object from manual
    let dates = {};

    // walk through and create new vals with true for 3rd item
    const manualIntDates = Object.keys(this.state.manual);
    for (let i = 0; i < manualIntDates.length; i++) {
      let d = manualIntDates[i];
      let newDate = {};
      const manualTraits = Object.keys(this.state.manual[d]);
      for (let j = 0; j < manualTraits.length; j++) {
        let trait = manualTraits[j];
        let traitVals = this.state.manual[d][trait]
        newDate[trait] = [traitVals[0], traitVals[1], true];
      }

      // newDate's traits are now filled in; add to new object
      dates[d] = newDate;
    }

    // and finally, set the state
    this.setState({dates: dates});

//    this.clearManualValue(9, "blade");
//    this.setManualValue(15, "blade", 8, 3);
  }

  getDayRows() {
    let dayRows = [];

    const rows = Object.keys(this.state.dates).map(key =>
      [key, this.state.dates[key]]
    )

    rows.forEach(function(row) {
      const dr = (
        <DayRow key={row[0]} intDate={row[0]} traits={row[1]}></DayRow>
      );
      dayRows.push(dr);
    })

    return dayRows
  }

  // sets this value without requesting an update of subsequent values.
  setValue(intDate, trait, newValue, newDecay, isManual) {
    this.setState(prevState => ({
      dates: {
        ...prevState.dates,
        [intDate]: {
          ...prevState.dates[intDate],
          [trait]: [newValue, newDecay, isManual]
        }
      }
    }));
  }

  setManualValue(intDate, trait, newValue, newDecay) {
    this.setValue(intDate, trait, newValue, newDecay, true);

    // also update manual list
    this.setState(prevState => ({
      manual: {
        ...prevState.manual,
        [intDate]: {
          ...prevState.manual[intDate],
          [trait]: [newValue, newDecay]
        }
      }
    }));
  }

  clearManualValue(intDate, trait) {
    this.setValue(intDate, trait, 0, 0, false);

    // also remove from manual list
    let revisedDate = this.state.manual[intDate]
    delete revisedDate[trait];

    this.setState(prevState => ({
      manual: {
        ...prevState.manual,
        [intDate]: revisedDate
      }
    }));
  }

  updateValuesInDateRange() {

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
            {this.getDayRows()}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default App;
