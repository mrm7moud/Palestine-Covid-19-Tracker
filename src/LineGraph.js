import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

// this options object from the document for line chartjs 2
const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll",
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    },
};

function LineGraph({ casesType = "cases"}) {
  const [data, setData] = useState({});

  const buildChartData = (data, casesType) => {
    let chartData = [];
    let lastDataPoint;

    for (let date in data.cases) {
      if (lastDataPoint) {
        let newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    };
    return chartData;
  };

  useEffect(() => {
      const fetchData = async () => {
          await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
          .then((response) => response.json())
          .then((data) => {
            // clever stuff here,,,
            let chartData = buildChartData(data, "cases");
            setData(chartData);
          });
      };
      fetchData();
  }, [casesType]);

  return (
    <div>
        <h1>I am a graph</h1>
        {/* data? this means like this data && data it's check if data is exist */}
        {data?.length > 0 && (
            <Line
            options={options}
              data={{
                datasets: [
                  {
                    backgroundColor: "rgba(204, 16, 52, 0.5)",
                    borderColor: "#cc1034",
                    data: data,
                  },
                ],
              }}
              options
            />
        )}
    </div>
  );
}

export default LineGraph;
