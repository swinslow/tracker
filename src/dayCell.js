import React from 'react'
import { Table } from 'semantic-ui-react';

function formatTraits(traits) {
    if (!traits) {
        return 0;
    }
    
    var s = traits[0] + ' (' + traits[1];
    if (traits[2] === true) {
        s += ', M)';
    } else {
        s += ')';
    }

    return s;
}

function DayCell(props) {
    return (
        <Table.Cell>{formatTraits(props.traitVals)}</Table.Cell>
    )
}

export default DayCell;
