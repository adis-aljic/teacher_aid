const findSchoolYear = () =>{

const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth()
let year1 = 0
let year2 = 0
if(currentMonth > 6){
    year1 = currentYear
    year2 = currentYear + 1
}
else {
    year1 = currentYear - 1
    year2 = currentYear
}
// skolska godina year1 / year2
return {
    year1,
    year2
}
}

function getFullWeeksInMonths() {
    const currentYear = new Date().getFullYear();
    const startDate = new Date(currentYear, 8, 1); // September 1st of current year
    const endDate = new Date(currentYear + 1, 5, 30); // June 30th of next year
  
    const fullWeeksInMonths = {};
  
    let currentDate = startDate;
  
    // Find the first Monday in September
    while (currentDate.getDay() !== 1) {
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    while (currentDate <= endDate) {
      const currentMonth = currentDate.getMonth();
      const nextMonth = (currentMonth + 1) % 12;
  
      let fullWeeks = 0;
      let weekDays = 0;
  
      if (currentMonth === 8 || currentMonth === 11) {
        while (currentDate.getMonth() === currentMonth) {
          if (currentDate.getDay() === 3) {
            if (weekDays > 2) {
              fullWeeks++;
            }
            weekDays = 0;
          } else {
            weekDays++;
          }
  
          currentDate.setDate(currentDate.getDate() + 1);
        }
      } else {
        while (currentDate.getMonth() === currentMonth || currentDate.getDay() !== 3) {
          if (currentDate.getDay() === 3) {
            if (weekDays > 2) {
              fullWeeks++;
            }
            weekDays = 0;
          } else {
            weekDays++;
          }
  
          currentDate.setDate(currentDate.getDate() + 1);
        }
      }
  
      const monthName = currentDate.toLocaleString('default', { month: 'long' });
      fullWeeksInMonths[monthName] = fullWeeks;
  
      if (currentDate.getMonth() === nextMonth) {
        currentDate.setDate(1);
      }
    }
  
    return fullWeeksInMonths;
  }
  
  // Usage:
  const fullWeeksInMonths = getFullWeeksInMonths();
  console.log(fullWeeksInMonths);
  

  function getWeekDates() {
    const currentYear = new Date().getFullYear();
    const months = ["September", "October", "November", "December", "January", "February", "March", "April", "May", "June"];
    const weekDates = {};
  
    for (let i = 0; i < months.length; i++) {
      const month = months[i];
      const startDate = new Date(currentYear, i + 8, 1); // Start from September (index 0) to June (index 9)
      const endDate = new Date(currentYear, i === 9 ? i + 9 : i + 8, i === 9 ? 21 : 30); // End at the third week of June
  
      let currentDate = new Date(startDate);
      let weekNumber = 1;
      let weekDatesArray = [];
  
      while (currentDate <= endDate) {
        if (currentDate.getDay() === 1) {
          const firstMonday = `${currentDate.getDate()}/${weekNumber}`;
          const friday = new Date(currentDate);
          friday.setDate(friday.getDate() + 4);
          weekDatesArray.push([firstMonday, `${friday.getDate()}/${weekNumber}`]);
        }
  
        currentDate.setDate(currentDate.getDate() + 1);
  
        if (currentDate.getDay() === 1) {
          weekNumber++;
        }
      }
  
      weekDates[month] = weekDatesArray;
    }
    weekDates.January = weekDates.January[weekDates.January.length-1]
    weekDates.June = weekDates.June.slice(0,3)
    // Object.weekDates.forEach(month =>{
    //     console.log(month);
    // })
    // console.log(typeof weekDates);

    return weekDates;
}

// Usage:
// const weeksInMonths = getWeekDates();
// console.log(Object.keys(weeksInMonths).length);

const weeksInMonths = getWeekDates();
console.log(weeksInMonths);
const lengths = {};

for (const month in weeksInMonths) {
  if (weeksInMonths.hasOwnProperty(month)) {
    const propertyLength = weeksInMonths[month].length;
    lengths[month] = propertyLength;
  }
}
console.log(lengths);