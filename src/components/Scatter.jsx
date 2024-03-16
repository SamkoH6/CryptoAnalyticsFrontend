import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { Container, Typography } from "@mui/material";

const YourScatterPlotComponent = ({ data, uid }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    let chart = null;

    if (data && data.every((innerArray) => Array.isArray(innerArray))) {
      // Ensure canvas element is available before accessing getContext
      const canvas = document.getElementById(uid);
      if (!canvas) return;

      const ctx = canvas.getContext("2d");

      // Clear existing chart if it exists
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // Create new chart
      chart = new Chart(ctx, {
        type: "scatter",
        data: {
          datasets: data.map((dataset, index) => ({
            label: `Returns ${index + 1}`,
            data: dataset.map((point, i) => ({ x: i + 1, y: point })),
            borderColor: `rgba(${Math.random() * 255}, ${
              Math.random() * 255
            }, ${Math.random() * 255}, 1)`, // Random color for each dataset
            backgroundColor: `rgba(${Math.random() * 255}, ${
              Math.random() * 255
            }, ${Math.random() * 255}, 0.6)`, // Random color for each dataset with opacity
            borderWidth: 1,
            pointRadius: 2,
            pointHoverRadius: 4,
          })),
        },
        options: {
          scales: {
            x: {
              type: "linear",
              position: "bottom",
            },
            y: {
              type: "linear",
              position: "left",
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

    return () => {
      // Cleanup chart when component unmounts
      if (chart) {
        chart.destroy();
        chart = null;
      }
    };
  }, [data, uid]);

  return (
    <Container>
      <Typography
        variant="h4"
        sx={{ fontSize: { xs: "1.5rem", md: "2.0rem" } }}
      >
        Daily Returns
      </Typography>
      <canvas id={uid}></canvas>
    </Container>
  );
};

export default YourScatterPlotComponent;
