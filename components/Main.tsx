import React from "react";
import useChart, { ChartOptions } from "../hooks/useChart";
import { useFetch } from "../hooks/useFetch";

export function Main() {
  const canvasRef = React.useRef(null);
  const canvasRef2 = React.useRef(null);
  const canvasRef3 = React.useRef(null);
  const { data: chartData } = useFetch(`/api/chart`)
  const { data, labels } = chartData || {};
  const barData = {
    type: "bar",
    label: Object.keys(data?.[0] || {})[0],
    yAxisID: "L",
    data: Object.values(data?.[0] || {})[0],
    borderWidth: 1
  }
  const lineData = {
    type: "line",
    label: Object.keys(data?.[1] || {})[0] || '',
    yAxisID: "R",
    data: Object.values(data?.[1] || {})[0],
    borderWidth: 1
  }
  const lineData2 = {
    type: "line",
    label: Object.keys(data?.[2] || {})[0] || '',
    yAxisID: "R",
    data: Object.values(data?.[2] || {})[0],
    borderWidth: 1
  }
  const combinedScales = {
    L: {
      beginAtZero: true,
      position: 'left'
    },
    R: {
      beginAtZero: true,
      position: 'right'
    }
  }
  const chartOptions: ChartOptions = {
    data: {
      labels: labels,
      datasets: []
    },
    options: {
      animations: {
        tension: {
          duration: 1000,
          easing: 'linear',
          from: 1,
          to: 0,
          // loop: true
        }
      },
      plugins: {
        legend: {
          display: true,
          labels: {
            color: "navy"
          }
        },
      },
    }
  }
  useChart(canvasRef, {
    ...chartOptions, data: {
      ...chartOptions.data,
      datasets: [{...barData} as any]
    }});
  useChart(canvasRef2, {
    ...chartOptions, data: {
      ...chartOptions.data,
      datasets: [barData as any, lineData as any, lineData2 as any]
    }, options: {
      ...chartOptions.options, scales: combinedScales
    }
  });
  useChart(canvasRef3, {
    data: {
      datasets: [{
        data: Object.values(data?.[0] || {})[0] as number[],
      }],
      labels: labels
    }
    , type: 'pie'
  });

  return (
    <div>
      <div className="container mx-auto px-16 max-w-screen-md">
        <h1>Chart JS Hook</h1>
        <div>
          <h2> Bar Chart</h2>
          <canvas ref={canvasRef} />
          <br/>
          <h2> Bar + Line Chart</h2>
          <canvas ref={canvasRef2} />
          <br/>
          <h2> Pie Chart </h2>
          <canvas ref={canvasRef3} />
        </div>
      </div>
    </div>
  );
}
