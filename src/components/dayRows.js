import React from "react"
import { connect } from "react-redux"
import DayRow from './dayRow.js';

const mapStateToProps = state => {
    return {
        startDate: state.startDate,
        endDate: state.endDate,
        dates: state.dates,
        selectedDate: state.selectedDate
    };
}

function getDayRows(dates, startDate, endDate, selectedDate) {
    let dayRows = [];

    const rows = Object.keys(dates).map(key =>
        [key, dates[key]]
    )

    rows.forEach(function (row) {
        let intDate = row[0];
        let intDateAsInt = parseInt(intDate, 10)
        if (intDate >= startDate && intDate <= endDate) {
            const dr = (
                <DayRow key={intDate} intDate={intDate} traits={row[1]} isSelectedDate={intDateAsInt === selectedDate}></DayRow>
            );
            dayRows.push(dr);
        }
    })

    return dayRows
}

const ConnectedDayRows = ({ dates, startDate, endDate, selectedDate }) => (
    getDayRows(dates, startDate, endDate, selectedDate)
)

const DayRows = connect(mapStateToProps)(ConnectedDayRows);

export default DayRows;
