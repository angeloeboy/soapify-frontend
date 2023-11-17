import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getProductStats } from "@/api/home"; // Adjust the import path
import { getProducts } from "@/api/products";
import styled from "styled-components";

const DataVisualizationContainer = styled.div`
  border-radius: 8px;
  border: 1px solid #dfdfdf;
  background: #fff;
  padding: 34px;
  width: 48%;
  height: 500px;
  margin: 1%;
  .title {
    color: #000;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 0px;
  }
  .totalSales {
    font-weight: bold;
  }
  .chart-container {
    width: 100%;
    margin-top: 10px; /* Add space between selections and the chart */
  }
  .selection-container {
    font-weight: bold;
    font-size: 16px;
    display: flex;
    flex-direction: row; /* Place select elements side by side */
    align-items: center; /* Center selection elements horizontally */
    margin-top: 10px; /* Add space between totalSales and selections */
  }
  .selection {
    font-size: 15px;
    display: inline-block;
    margin-right: 10px;
  }
`;

const DataVisualization = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectableYears, setSelectableYears] = useState([selectedYear]);

  const [startDate, setStartDate] = useState(new Date()); // Date picker start date
  const [endDate, setEndDate] = useState(new Date()); // Date picker end date

  const [productsList, setProductsList] = useState([]);
  const [productStats, setProductStats] = useState([]);
  const [unitsSoldData, setUnitsSoldData] = useState([]); // New state for units sold data
  const [totalUnitsSold, setTotalUnitsSold] = useState(0);
  const [selectedDataType, setSelectedDataType] = useState("sales"); // Default to "sales"

  useEffect(() => {
    fetchProducts();
  }, [selectedProduct, selectedYear, startDate, endDate]);

  useEffect(() => {
    calculateTotalUnitsSold();
  }, [productsList, selectedYear, startDate, endDate]);

  useEffect(() => {
    calculateChartData();
  }, [productStats, selectedYear, selectedDataType, startDate, endDate]);
  useEffect(() => {
    if (selectedDataType === "sales") {
      fetchSalesData(); // Fetch sales data when the data type changes
    }
  }, [selectedDataType, selectedProduct, selectedYear, startDate, endDate]);

  const fetchProducts = () => {
    getProducts()
      .then((res) => {
        if (Array.isArray(res.products)) {
          setProductsList(res.products);
        } else {
          setProductsList([]);
        }
        console.log("products", res.products); // Corrected console.log statement
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const calculateTotalUnitsSold = async () => {
    let totalSold = 0;
    for (const product of productsList) {
      const productStats = await getProductStats(
        product.product_id,
        selectedYear,
        startDate,
        endDate
      );
      if (productStats.transactions) {
        totalSold += Object.values(productStats.transactions).reduce(
          (acc, value) => acc + value,
          0
        );
      }
    }
    setTotalUnitsSold(totalSold);
  };
  const calculateChartData = async () => {
    let data = [];

    if (selectedDataType === "sales") {
      // Fetch sales data
      try {
        await fetchSalesData();
        data = salesDataResponse.data; // Modify this line based on your API response structure
      } catch (error) {
        console.error("Error fetching sales data", error);
      }
    } else if (selectedDataType === "unitsSold") {
      // Fetch units sold data
      try {
        const unitsSoldData = await getProductStats(
          selectedProduct,
          selectedYear,
          startDate,
          endDate
        );
        // Modify this line based on your API response structure
        data = Object.values(unitsSoldData.transactions || {});
      } catch (error) {
        console.error("Error fetching units sold data", error);
      }
    }

    // Update the chart data
    setChartData({
      datasets: [
        {
          label: selectedDataType === "sales" ? "Sales" : "Units Sold",
          data,
          backgroundColor:
            selectedDataType === "sales"
              ? "rgba(255, 99, 132, 0.2)"
              : "rgb(26, 255, 255)",
          borderColor:
            selectedDataType === "sales"
              ? "rgba(255, 99, 132, 1)"
              : "rgba(26, 255, 255)",
          borderWidth: 1,
        },
      ],
    });
  };
  useEffect(() => {
    fetchUnitsSoldData();
  }, [selectedProduct, selectedYear]);

  const fetchSalesData = async () => {
    // Implement logic to fetch sales data
    // Example: const response = await yourSalesDataApiCall();
    // return response.data;
    return { data: [] };
  };

  const fetchUnitsSoldData = async () => {
    const unitsSoldData = await getProductStats(
      selectedProduct,
      selectedYear,
      startDate,
      endDate
    );
    setUnitsSoldData(unitsSoldData.transactions);
    console.log("units Sold Data", unitsSoldData.transactions);
    if (
      !unitsSoldData.transactions ||
      Object.keys(unitsSoldData.transactions).length === 0
    ) {
      return; // Return to prevent further chart updates
    }

    if (unitsSoldData.transactions) {
      const labels = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const initialData = Array(labels.length).fill(0);

      const data = unitsSoldData.transactions
        ? Object.values(unitsSoldData.transactions)
        : initialData;
      setChartData({
        labels,
        datasets: [
          {
            label: "Units Sold",
            data,
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgb(75, 192, 192)",
            fill: false,
          },
        ],
      });
    } else {
      // Handle the case where productStats.transactions is undefined
      console.log("No data available");
    }
  };

  const handleDataTypeChange = (e) => {
    setSelectedDataType(e.target.value);
  };
  const chartOptions = {
    maintainAspectRatio: true,
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          font: {
            size: 16,
            weight: "bold",
          },
        },
      },
      y: {
        grid: {
          display: true,
        },
        title: {
          display: true,
          font: {
            size: 16,
            weight: "bold",
          },
        },
        beginAtZero: true,
        max: totalUnitsSold,
      },
    },
    height: 500,
  };
  return (
    <DataVisualizationContainer>
      <div>
        <label htmlFor="dataType">Select Data Type: </label>
        <select
          id="dataType"
          value={selectedDataType}
          onChange={handleDataTypeChange}
        >
          <option value="sales">Sales</option>
          <option value="unitsSold">Units Sold</option>
        </select>
        <label htmlFor="product">Select Product: </label>
        <select
          id="product"
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
        >
          {productsList === null ? (
            <option value="" disabled>
              Loading products...
            </option>
          ) : (
            productsList.map((product) => (
              <option value={product.product_id} key={product.product_id}>
                {product.product_name}
              </option>
            ))
          )}
        </select>
        <label htmlFor="startDate" className="selection">
          Start Date:
        </label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
        <label htmlFor="endDate" className="selection">
          End Date:
        </label>
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
      </div>

      {selectedDataType === "sales" ? (
        <Bar data={chartData} options={chartOptions} />
      ) : (
        <Line data={chartData} options={chartOptions} />
      )}
      {/* Add additional components or information based on selectedDataType */}
      <p>Total Units Sold: {totalUnitsSold}</p>
    </DataVisualizationContainer>
  );
};

export default DataVisualization;
