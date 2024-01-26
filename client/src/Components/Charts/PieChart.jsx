import React from 'react'
import {  Pie } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto';




function PieChart({inData}) {
  const labels = Object.keys(inData);
const data = {
  labels: labels,
  datasets: [{
    label: 'Count',
    // data: [65, 59, 80, 81, 56, 55, 40],
    data: Object.values(inData),
    backgroundColor:  [
      'rgba(255, 99, 132, 1)',
      'rgba(255, 159, 64, 1)',
      'rgba(255, 205, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(201, 203, 207, 1)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]
};
    return (
        <>
            <Pie
                data={data}
            />
        </>
    )
}

export default PieChart