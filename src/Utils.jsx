const fetchData = async () => {
  try {
    // const response = await fetch(
    //   "https://cryptoanalyticsbackend.onrender.com/"
    // );
    const response = await fetch(
      "https://crypto-analytics-backend-77c14449f33c.herokuapp.com/"
    );
    const responseData = await response.json();
    console.log("Received data:", responseData.data);
    return responseData.data;
  } catch (error) {
    console.error("Error fetching graph data:", error);
    throw error; // Propagate the error for handling in the component
  }
};

export default fetchData;
