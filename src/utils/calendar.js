import { MONTHS } from '../constants/dates';

export function getCalendarStringFromIntDate(intDate) {
    // intDate 1 = 1496 Shiayen 1
    // walk through, iterating until we find the month that this date
    // is in, and decrease counter as we walk
    if (intDate <= 0) {
        return "pre-1496"
    }

    let iter;
    let year = 1496;
    let intMonth = 0;
    for (iter = intDate; iter >= 0;) {
        // check the number of days in the current month,
        // adjusting for leap day if needed (Grumayen 27 => 28)
        let numDays = MONTHS[intMonth].days
        if (intMonth === 6 && (year % 4) === 0) {
            numDays += 1
        }

        // now check if we've found the right month
        if (iter <= numDays) {
            break
        }

        // we haven't, so continue to next month
        iter -= numDays
        intMonth += 1
        if (intMonth >= 12) {
            year += 1
            intMonth -= 12
        }
    }

    // once we get here, we're now in the right year and month
    return String(year) + " " + MONTHS[intMonth].month + " " + String(iter)
}
