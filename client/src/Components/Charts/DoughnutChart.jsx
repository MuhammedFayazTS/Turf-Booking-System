import React from 'react'
import {  Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto';



function DoughnutChart({inData}) {
  const labels = ["owners", "users"];
  const data = {
    labels: labels,
    datasets: [{
      label: 'count',
      data: Object.values(inData),
      // data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
        'rgba(255, 159, 64, 1)',
        'rgba(255, 205, 86, 1)',
      ],
      borderColor: [
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)'
      ],
      borderWidth: 1
    }]
  };
  return (
        <>
            <Doughnut
                data={data}
            />
        </>
    )
}

export default DoughnutChart