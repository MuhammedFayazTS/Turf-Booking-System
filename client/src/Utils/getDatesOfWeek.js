 const moment = require('moment');

 export function getCurrentWeekDates() {
  const currentWeekDates = [];
  
  // Get the current date
  const today = moment();

  // Get the start of the week (Monday) for the current date
  const startOfWeek = today.clone().startOf('isoWeek');

  // Iterate from Monday to Sunday and add each date to the array
  for (let i = 0; i < 7; i++) {
    const currentDate = startOfWeek.clone().add(i, 'days');
    currentWeekDates.push(currentDate.format('YYYY-MM-DD'));
  }

  return currentWeekDates;
}
