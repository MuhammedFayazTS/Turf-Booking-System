import moment from "moment";

export const includes = [
  "Football",
  "Cricket",
  "Badminton",
  "Swimming",
  "Basketball",
  "Tennis",
  "VolleyBall",
  "Table Tennis",
  "Boxing"
];

export const amenities = [
  "Parking",
  "Drinking Water",
  "Washroom",
  "Food Court",
  "WiFi",
  "Restroom",
  "Seating Area",
  "Storage System",
  "First Aid Station"
];


export const textfieldItems = [
    { label: 'Venue Name', name: 'name', type: 'text' },
    { label: 'Email', name: 'email', type: 'email' },
    { label: 'Phone number', name: 'phone', type:'number' },
    { label: 'Location', name: 'location', type: 'text' },
    { label: 'Number of Pitches', name: 'pitches', type: 'number' },
  ];

export const coachTextFieldNames = [
    { label: 'Coach Name', name: 'name', type: 'text' },
    { label: 'Email', name: 'email', type: 'email' },
    { label: 'Phone number', name: 'phone', type:'number' },
    { label: 'Location', name: 'location', type: 'text' },
    { label: 'Experience', name: 'experience', type: 'number' },
    { label: 'Price', name: 'price', type: 'number' },
  ];
  
  let timeArray = []
  for (let i = 0; i <24;i++){
    const time = moment().startOf('day').add(i, 'hours').format('hh:mm A');
  timeArray.push(time);
  }
export  const timeOptions = timeArray
