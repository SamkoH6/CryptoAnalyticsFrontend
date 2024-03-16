import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import LandingPage from "./Landingpage";
import fetchData from "./Utils";

function App() {
  const [mainData, setMainData] = useState([]);

  useEffect(() => {
    const fetchDataForMain = async () => {
      try {
        const data = await fetchData(); // Using the fetchData utility
        setMainData(data);
      } catch (error) {
        // Handle the error, e.g., show an error message to the user
        console.error("Error fetching data for main component:", error);
      }
    };

    fetchDataForMain();
  }, []);

  return (
    <div>
      <CssBaseline />
      <LandingPage mainData={mainData} setMainData={setMainData} />
    </div>
  );
}

export default App;
