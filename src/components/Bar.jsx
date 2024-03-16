import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { Container, Typography } from "@mui/material";

const YourBarChartComponent = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data) {
      if (chartRef.current) {
        // Destroy the existing chart instance
        chartRef.current.destroy();
      }

      const canvas = document.getElementById("yourBarChart");

      if (canvas) {
        const ctx = canvas.getContext("2d");

        // Specify the order of days
        const daysOrder = [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ];

        // Sort the data based on the specified order of days
        const sortedData = daysOrder.map((day) => data[day]);

        // Process the data to calculate the sum of values for each day
        const sumData = sortedData.map((dayData) =>
          dayData.reduce((acc, value) => acc + value, 0)
        );

        const labels = daysOrder;

        const chart = new Chart(ctx, {
          type: "bar", // Set the chart type to 'bar'
          data: {
            labels: labels,
            datasets: [
              {
                label: "Sum",
                data: sumData,
                backgroundColor: "rgba(54, 162, 235, 0.6)", // Set background color
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
            plugins: {
              legend: {
                display: true,
                position: "top",
              },
            },
          },
        });

        chartRef.current = chart;
      }
    }

    // Clean up function to destroy the chart when component unmounts or data changes
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data]);

  return (
    <Container>
      <Typography
        variant="h4"
        sx={{ fontSize: { xs: "1.5rem", md: "2.0rem" } }}
      >
        Average Weekly Spikes
      </Typography>
      <canvas id="yourBarChart"></canvas>
    </Container>
  );
};

export default YourBarChartComponent;
