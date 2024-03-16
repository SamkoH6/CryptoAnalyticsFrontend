import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { Container, Typography } from "@mui/material";

const YourGraphComponent = ({ data, uid }) => {
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
        type: "line",
        data: {
          labels: Array.from(
            { length: data[0].length },
            (_, index) => index + 1
          ), // Assuming all datasets have the same length
          datasets: data.map((dataset, index) => ({
            label: index === 0 ? "Pricing" : "SMA",
            data: dataset,
            borderColor: `rgba(${Math.random() * 255}, ${
              Math.random() * 255
            }, ${Math.random() * 255}, 1)`, // Random color for each dataset
            borderWidth: 1,
            fill: false,
            pointBackgroundColor: "rgba(0, 0, 0, 0)",
            pointBorderColor: "rgba(0, 0, 0, 0)",
          })),
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
        Pricing and SMA values
      </Typography>
      <canvas id={uid}></canvas>
    </Container>
  );
};

export default YourGraphComponent;
