import React from "react"
import { connect } from "react-redux"
import DayRow from './dayRow.js';

const mapStateToProps = state => {
    return {
        startDate: state.startDate,
        endDate: state.endDate,
        dates: state.dates
    };
}

function getDayRows(dates, startDate, endDate) {
    let dayRows = [];

    const rows = Object.keys(dates).map(key =>
        [key, dates[key]]
    )

    rows.forEach(function (row) {
        let intDate = row[0];
        if (intDate >= startDate && intDate <= endDate) {
            const dr = (
                <DayRow key={intDate} intDate={intDate} traits={row[1]}></DayRow>
            );
            dayRows.push(dr);
        }
    })

    return dayRows
}

const ConnectedDayRows = ({ dates, startDate, endDate }) => (
    getDayRows(dates, startDate, endDate)
)

const DayRows = connect(mapStateToProps)(ConnectedDayRows);

export default DayRows;
