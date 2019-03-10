import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import DayRow from './dayRow.js';
import { Table } from 'semantic-ui-react';

const TRAITS = [
  "blade",
  "calm",
  "chaos",
  "death",
  "eye",
  "fascination",
  "hunger",
  "key",
  "life",
  "prime",
]

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: 7,
      endDate: 25,
      manual: {
        7: {
          "calm": [4, 3]
        },
        9: {
          "blade": [8, 3]
        }
      },
      dates: {}
    }

    this.dates = {}
  }

  componentDidMount() {
    this.resetDatesWithManual()

//    this.clearManualValue(9, "blade");
    this.setManualValue(15, "blade", 14, 3);
  }

  resetDatesWithManual() {
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

    // update the subsequent date values
    // don't call setState here, we'll do it later after we
    // update all the values
    this.dates = dates;
    this.updateValues();
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
    // update manual list, and when it's done,
    // trigger recalculating dates from manual
    this.setState(prevState => ({
      manual: {
        ...prevState.manual,
        [intDate]: {
          ...prevState.manual[intDate],
          [trait]: [newValue, newDecay]
        }
      }
    }), this.resetDatesWithManual);
  }

  clearManualValue(intDate, trait) {
    // remove from manual list, and when it's done,
    // trigger recalculating dates from manual
    let revisedDate = this.state.manual[intDate]
    delete revisedDate[trait];

    this.setState(prevState => ({
      manual: {
        ...prevState.manual,
        [intDate]: revisedDate
      }
    }), this.resetDatesWithManual);
  }

  // // returns true if there are any traits with values
  // // for the given intDate.
  // hasAnyTraitValues(intDate) {
  //   date
  // }

  // // returns the intDate of the last day, prior to
  // // beforeDate, on which there was no influence for
  // // any trait, or 0 intDate at minimum.
  // findLastEmptyDay(beforeDate) {

  // }

  // updates a single trait for a single day within a local
  // dates object (e.g., does not itself set state), based on
  // the values on the prior day within that date object.
  updateValueForTraitOnDate(datesObj, intDate, trait) {
    // if the intDate is <= 0, bail, we can't go any earlier
    if (intDate <= 0) {
      return;
    }

    // if today was manually set, just go with that
    let dToday = datesObj[intDate]
    if (dToday) {
      let traitToday = dToday[trait]
      if (traitToday) {
        // was this trait manually set today?
        if (traitToday[2]) {
          // it was, so keep its value and exit
          return;
        }
      }
    }

    // get the date object for the day before
    let dYest = datesObj[intDate - 1]
    if (!dYest) {
      // not found, record 0 here and bail
      datesObj[intDate] = {
        ...datesObj[intDate],
        [trait]: [0, 0, false]
      };
      return;
    }

    // get the value for this trait from yesterday
    let tVal = dYest[trait]
    if (!tVal) {
      // no value yesterday, record 0 here and bail
      datesObj[intDate] = {
        ...datesObj[intDate],
        [trait]: [0, 0, false]
      };
      return;
    }

    // now, decide how to set today's trait values based
    // on yesterday's value and decay
    let newDecay = tVal[1] - 1;
    if (newDecay < 0) {
      newDecay = 0;
    }
    if (newDecay > 0) {
      // we haven't decayed, so use the same trait value
      // and just decrement the decay
      datesObj[intDate] = {
        ...datesObj[intDate],
        [trait]: [tVal[0], newDecay, false]
      };
    } else {
      // we've decayed, so adjust the trait value and
      // reset the decay to what it should be, each
      // depending on the trait
      let newValue;
      if (trait === "fascination") {
        newValue = tVal[0] - 1;
        newDecay = 7;
      } else {
        newValue = Math.floor(tVal[0] / 2);
        newDecay = 3;
      }
      // if our trait value is now 0, decay should also
      // be 0 so we stop recounting
      if (newValue === 0) {
        newDecay = 0;
      }
      datesObj[intDate] = {
        ...datesObj[intDate],
        [trait]: [newValue, newDecay, false]
      };
    }

  }

  updateValues() {
    // first, create a copy of the existing dates object
    let dates = {};

    // walk through and copy dates => trait vals
    // also note the min and max date as we proceed
    let minDate = 999999;
    let maxDate = 0;
    const intDates = Object.keys(this.dates);
    for (let i = 0; i < intDates.length; i++) {
      let d = intDates[i];
      if (d < minDate) {
        minDate = d;
      }
      if (d > maxDate) {
        maxDate = d;
      }
      let newDate = {};
      const traits = Object.keys(this.dates[d]);
      for (let j = 0; j < traits.length; j++) {
        let trait = traits[j];
        let traitVals = this.dates[d][trait]
        newDate[trait] = [traitVals[0], traitVals[1], traitVals[2]];
      }

      // newDate's traits are now filled in; add to new object
      dates[d] = newDate;
    }

    console.log(dates);

    // okay, now the local dates object is a copy, so we don't
    // have to worry about waiting for setState calls to
    // propagate before continuing to the next day.

    // we should be able to walk through in order, starting with
    // the earliest date and continuing until the requested
    // end date.
    for (let iter = minDate; iter <= this.state.endDate; iter++) {
      for (let t = 0; t < TRAITS.length; t++) {
        console.log("updating " + iter + ", " + TRAITS[t]);
        this.updateValueForTraitOnDate(dates, iter, TRAITS[t]);
      }
    }

    // finally, at the end, set the state!
    this.dates = dates;
    this.setState({dates: this.dates});
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
