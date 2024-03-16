import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { Container, Typography } from "@mui/material";

const YourGraphComponent = ({ data, uid }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    let currentChart = chartRef.current;

    if (data && data.every((innerArray) => Array.isArray(innerArray))) {
      // Check if all inner arrays are defined
      if (currentChart) {
        currentChart.destroy();
      }

      const canvas = document.getElementById(uid);

      // Ensure canvas element is available before accessing getContext
      if (canvas) {
        const ctx = canvas.getContext("2d");

        // Concatenate the pricing and prediction data arrays
        const mergedData = [...data[0], ...data[1]];

        // Create labels for the combined data
        const labels = Array.from(
          { length: mergedData.length },
          (_, index) => index + 1
        );

        currentChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Pricing and Prediction",
                data: mergedData,
                borderColor: `rgba(${Math.random() * 255}, ${
                  Math.random() * 255
                }, ${Math.random() * 255}, 1)`,
                borderWidth: 1,
                fill: false,
                pointBackgroundColor: "rgba(0, 0, 0, 0)",
                pointBorderColor: "rgba(0, 0, 0, 0)",
              },
              {
                label: "Pricing",
                data: data[0],
                borderColor: `rgba(${Math.random() * 255}, ${
                  Math.random() * 255
                }, ${Math.random() * 255}, 1)`,
                borderWidth: 2,
                fill: false,
                pointBackgroundColor: "rgba(0, 0, 0, 0)",
                pointBorderColor: "rgba(0, 0, 0, 0)",
              },
            ],
          },
          options: {
            scales: {
              x: {
                type: "linear",
                position: "bottom",
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

        chartRef.current = currentChart;
      }
    }

    return () => {
      if (currentChart) {
        currentChart.destroy();
      }
    };
  }, [data, uid]);

  return (
    <Container>
      <Typography
        variant="h4"
        sx={{ fontSize: { xs: "1.5rem", md: "2.0rem" } }}
      >
        Pricing with LSTM model prediction
      </Typography>
      <canvas id={uid}></canvas>
    </Container>
  );
};

export default YourGraphComponent;
