import * as React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AppAppBar from "./components/Apbar";
import Inputs from "./components/Inputs";
import Footer from "./components/Footer";
import getLPTheme from "./components/Theme";
import ChartBox from "./components/ChartBox";
import Chart from "./components/Chart";
import Bar from "./components/Bar";
import Scatter from "./components/Scatter";
import PredictionChart from "./components/PredictionChart";

export default function LandingPage({ mainData, setMainData }) {
  const [mode, setMode] = React.useState("dark");
  const LPtheme = createTheme(getLPTheme(mode));

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeProvider theme={LPtheme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Inputs mainData={mainData} setMainData={setMainData} />
      <ChartBox tag={"price"}>
        <Chart data={[mainData.prices, mainData.sma]} uid={"chart1"} />
      </ChartBox>
      <ChartBox tag={"bar"}>
        <Bar data={mainData.week_data} />
      </ChartBox>
      <ChartBox tag={"dailyReturns"}>
        <Scatter data={[mainData.daily_returns]} uid={"chart2"} />
      </ChartBox>
      <ChartBox tag={"prediction"}>
        <PredictionChart
          data={[mainData.prices, mainData.prediction]}
          uid={"chart3"}
        />
      </ChartBox>
      <Footer />
    </ThemeProvider>
  );
}
