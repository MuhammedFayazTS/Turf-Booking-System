import moment from "moment";
import { getCurrentWeekDates } from "./getDatesOfWeek";

export const getCountOfDates = (counts) => {
    let weekDates = getCurrentWeekDates();

    // Initialize an object to store counts for each date
    let countsByDate = {};

    // Filter counts for this week
    let countsThisWeek = counts.filter((count) => {
        let countDate = moment(count.createdAt);
        return countDate.isBetween(weekDates[0], weekDates[weekDates.length - 1], null, '[]');
    });

    // Map counts to the corresponding date in the object
    countsThisWeek.forEach((count) => {
        let countDate = moment(count.createdAt).format('YYYY-MM-DD');

        // Check if the date is already a key in the object
        if (countsByDate[countDate]) {
            countsByDate[countDate].push(count);
        } else {
            // If not, create a new array for the date
            countsByDate[countDate] = [count];
        }
    });

    // Log the counts for each date
    return countsByDate;
};