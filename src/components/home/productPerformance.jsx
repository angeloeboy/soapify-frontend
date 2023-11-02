import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Line } from "react-chartjs-2";
import { getProductStats } from "@/api/home"; // Adjust the import path
import { getProducts } from "@/api/products";
const LineGraphContainer = styled.div`
  border-radius: 8px;
  border: 1px solid #dfdfdf;
  background: #fff;
  padding: 28px;
  display: inline-block;
  width: 60%;
  height: 500px;
  margin: 1%;
  .title {
    color: #000;
    font-size: 16px;
    font-weight: 700;
    /* margin-bottom: 35px; */
  }

  .stats-container {
    display: flex;
    align-items: center;
    /* justify-content: space-between; */
  }
  .selection {
    font-size: 15px;
    display: inline-block;
    margin-right: 10px; /* Add margin to create space between them */
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

  const addNewYear = () => {
    const newYear = selectableYears[selectableYears.length - 1] + 1;
    selectableYears.push(newYear);
    setSelectedYear(newYear); // Update selectedYear to the new year
  };
  useEffect(() => {
    fetchData();
    fetchProducts();
  }, [selectedProduct, selectedYear]);

  const fetchProducts = () => {
    getProducts()
      .then((res) => {
        console.log(res);
        if (Array.isArray(res.products)) {
          setProductsList(res.products);
        } else {
          setProductsList([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [productStats, setProductStats] = useState([]); // Product stats
  const fetchData = async () => {
    const productStats = await getProductStats(selectedProduct, selectedYear);
    setProductStats(productStats.transactions);
    console.log("Product ID:", selectedProduct);
    console.log("Product Transactions", productStats.transactions);
    // Use setInterval to add a new year every 365 days

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

      setChartData({
        labels,
        datasets: [
          {
            label: "Units Sold",
            data: Object.values(productStats.transactions),
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
    maintainAspectRatio: false,
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
        title: {
          display: true,
          font: {
            size: 16,
            weight: "bold",
          },
        },
        beginAtZero: true,
        stepsize: 1,
        stepsize: 1,
        // Set the max property dynamically when productStats.transactions is available
        max: 100,
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
      <Line data={chartData} options={chartOptions} />
    </LineGraphContainer>
  );
};

export default ProductPerformance;
