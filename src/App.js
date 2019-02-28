import React, { Component } from 'react';
import './App.css';
import DayRow from './dayRow.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dates: {
        9: {
          "blade": [8, 3, true],
          "calm": [4, 1, false]
        },
        10: {
          "blade": [8, 2, false],
          "calm": [2, 3, false]
        }
      }
    }
  }

  getDayRows() {
    var dayRows = [];

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

  render() {
    return (
      <div className="App">
        <h2>Dates</h2>
        <table>
          <tbody>
            {this.getDayRows()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
