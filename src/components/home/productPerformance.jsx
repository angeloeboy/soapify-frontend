import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Line } from "react-chartjs-2";
import { getProductStats } from "@/api/home"; // Adjust the import path
import { getProducts } from "@/api/products";
const LineGraphContainer = styled.div`
  border-radius: 8px;
  border: 1px solid #dfdfdf;
  background: #fff;
  padding: 20px;
  width: 50%;
  margin-left: 25%;

  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Adjust alignment to top left */

  .title {
    color: #000;
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 10px; /* Add some margin between title and totalSales */
  }

  .totalSales {
    font-size: 14px;
    font-weight: bold;
  }

  .selection-container {
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

  .chart-container {
    padding-left: 80px;
    width: 100%;
    margin-top: 10px; /* Add space between selections and the chart */
  }

  .summary {
    font-size: 14px;
    margin-top: 5px; /* Add space between the chart and the summary */
  }
`;

const ProductPerformance = () => {
  const [chartData, setChartData] = useState({
    labels: [], // Labels for months
    datasets: [],
  });
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Initial year
  const selectableYears = [selectedYear];
  const [productsList, setProductsList] = useState([]); // List of products
  const [productStats, setProductStats] = useState([]); // Product stats
  const [totalUnitsSold, setTotalUnitsSold] = useState(0);

  const calculatePercentageChange = () => {
    if (chartData.labels.length < 2 || !chartData.datasets[0].data) {
      return 0; // Return 0 when there's insufficient data
    }

    const data = chartData.datasets[0].data;

    let totalPercentageChange = 0;

    for (let i = 1; i < data.length; i++) {
      const currentMonth = data[i];
      const previousMonth = data[i - 1];

      if (isNaN(currentMonth) || isNaN(previousMonth) || previousMonth === 0) {
        continue; // Skip invalid or zero values to avoid NaN
      }

      const change = ((currentMonth - previousMonth) / previousMonth) * 100;
      totalPercentageChange += change;
    }

    return totalPercentageChange;
  };
  const calculateTotalUnitsSold = async () => {
    let totalSold = 0;
    for (const product of productsList) {
      const productStats = await getProductStats(
        product.product_id,
        selectedYear
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

  const calculateMostSoldMonth = () => {
    if (chartData.labels.length === 0 || !productStats) {
      return "No data available";
    }
    const maxSold = Math.max(...chartData.datasets[0].data);
    const maxSoldMonthIndex = chartData.datasets[0].data.indexOf(maxSold);
    const maxSoldMonth = chartData.labels[maxSoldMonthIndex];
    return maxSoldMonth;
  };

  const addNewYear = () => {
    const newYear = selectableYears[selectableYears.length - 1] + 1;
    selectableYears.push(newYear);
    setSelectedYear(newYear); // Update selectedYear to the new year
  };

  useEffect(() => {
    fetchData();
    fetchProducts();
  }, [selectedProduct, selectedYear]);
  useEffect(() => {
    calculateMostSoldMonth();
  }, [selectedYear]);
  useEffect(() => {
    calculatePercentageChange();
  }, [selectedYear]);

  //get products list from backend
  const fetchProducts = () => {
    getProducts()
      .then((res) => {
        console.log(res);
        if (Array.isArray(res.products)) {
          setProductsList(res.products);
          calculateTotalUnitsSold();
          // console.log("Products List:", productsList);
        } else {
          setProductsList([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchData = async () => {
    const productStats = await getProductStats(selectedProduct, selectedYear);
    setProductStats(productStats.transactions);
    // console.log("product stats: ", productStats);
    // console.log("Product ID:", selectedProduct);
    // console.log("Product Transactions", productStats.transactions);

    if (
      !productStats.transactions ||
      Object.keys(productStats.transactions).length === 0
    ) {
      window.alert("Selected Product has no transactions as of now.");
      return; // Return to prevent further chart updates
    }

    if (productStats.transactions) {
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

      const data = productStats.transactions
        ? Object.values(productStats.transactions)
        : initialData;
      setChartData({
        labels,
        datasets: [
          {
            label: "Units Sold",
            data,
            borderColor: "rgb(75, 192, 192)",
            fill: false,
          },
        ],
      });
    } else {
      // Handle the case where productStats.transactions is undefined
      console.log("No data available");
    }
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

  useEffect(() => {
    const intervalId = setInterval(addNewYear, 1000 * 60 * 60 * 24 * 365); // Add a year every year
    return () => clearInterval(intervalId);
  }, []);

  return (
    <LineGraphContainer>
      <p className="title">Product Performance</p>
      <p
        className="totalSales"
        style={{ fontSize: "14px", fontWeight: "bold" }}
      >
        Total Units Sold: {totalUnitsSold}
      </p>
      <div className="selection-container">
        <div className="selection">
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
        </div>
        <div className="selection">
          <label htmlFor="year">Select Year: </label>
          <select
            id="year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value, 10))}
          >
            {selectableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="chart-container">
        <Line data={chartData} options={chartOptions} />
      </div>
      <p className="summary" style={{ fontSize: "14px", fontWeight: "bold" }}>
        Most Sold Month: {calculateMostSoldMonth()}
      </p>
      <p className="summary" style={{ fontSize: "14px", fontWeight: "bold" }}>
        Total Percentage Change: {calculatePercentageChange().toFixed(2)}%
      </p>
    </LineGraphContainer>
  );
};

export default ProductPerformance;
