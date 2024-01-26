import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto';



function LineChart({inData}) {
  const labels = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  const data = {
    labels: labels,
    datasets: [{
      label: 'Revenue this week',
      // data: [65, 59, 80, 81, 56, 55, 40],
      data: inData,
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };
    return (
        <>
            <Line   
                data={data}
            />
        </>
    )
}

export default LineChart