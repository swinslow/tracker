import React from 'react'

function DayRow(props) {
    return (
        <tr>
            <td>{props.intDate}</td>
            <td>{props.traits["blade"]}</td>
            <td>{props.traits["calm"]}</td>
        </tr>
    )
}

export default DayRow;
