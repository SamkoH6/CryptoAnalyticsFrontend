const fetchData = async () => {
  try {
    const response = await fetch("http://127.0.0.1:5000");
    const responseData = await response.json();
    console.log("Received data:", responseData.data);
    return responseData.data;
  } catch (error) {
    console.error("Error fetching graph data:", error);
    throw error; // Propagate the error for handling in the component
  }
};

export default fetchData;
