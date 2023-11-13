import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

import { getProductStats } from "@/api/home"; // Adjust the import path
import { getProducts } from "@/api/products";

const LineGraphContainer = styled.div`
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

const ProductSalesGraph = () => {
  const [chartData, setChartData] = useState({
    labels: [], // Labels for months
    datasets: [],
  });
  const [productData, setProductData] = useState(null);
  //   const [productsList, setProductsList] = useState(null);
  const [monthData, setMonthData] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Initial year
  const [selectedProductId, setSelectedProductId] = useState(null); // New state for selected product
  const selectableYears = [selectedYear];

  useEffect(() => {
    fetchData();
    fetchProducts();
  }, [selectedProductId, selectedYear]);

  useEffect(() => {
    generateChartData();
  }, [productData, monthData, selectedProductId]);

  //get products list from backend

  const fetchProducts = () => {
    getProducts()
      .then((res) => {
        console.log(res);
        if (Array.isArray(res.products)) {
          setProductData(res.products);
          // console.log("Products List:", productsList);
        } else {
          setProductData([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchData = async () => {
    try {
      const monthResponse = await getProductStats(
        selectedProductId,
        selectedYear
      );

      setMonthData(monthResponse);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const options = {
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
        max: 5000,
      },
    },
    height: 500,
  };

  const addNewYear = () => {
    const newYear = selectableYears[selectableYears.length - 1] + 1;
    selectableYears.push(newYear);
    setSelectedYear(newYear); // Update selectedYear to the new year
  };

  const generateChartData = () => {
    if (!productData || !monthData || !selectedProductId) {
      return null;
    }
    console.log("productData:", productData);
    console.log(typeof selectedProductId);
    const selectedProduct = productData.find(
      (product) => product.product_id === selectedProductId
    );
    console.log("selectedProduct:", selectedProduct);
    if (!selectedProduct) {
      console.error(`Product with product_id ${selectedProductId} not found`);
      return null;
    }

    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEPT",
      "OCT",
      "NOV",
      "DEC",
    ];
    console.log("months:", months);
    const prices = Array(months.length).fill(selectedProduct.product_price);
    const transactions = months.map(
      (month, index) => monthData.transactions[index + 1] || 0
    );

    const salesData = prices.map((price, index) => {
      const transaction = transactions[index];
      const calculatedSale = (price / 100) * transaction;
      console.log(
        `Month: ${months[index]}, Price: ${price}, Transactions: ${transaction}, Sales: ${calculatedSale}`
      );
      return calculatedSale;
    });

    const chartData = {
      labels: months,
      datasets: [
        {
          label: "Sales",
          data: salesData,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    };

    setChartData(chartData);
  };

  const handleProductChange = (e) => {
    const selectedProductId = parseInt(e.target.value);
    setSelectedProductId(selectedProductId);
  };

  useEffect(() => {
    const intervalId = setInterval(addNewYear, 1000 * 60 * 60 * 24 * 365); // Add a year every year
    return () => clearInterval(intervalId);
  }, []);

  return (
    <LineGraphContainer>
      <div className="title">Product Sales</div>
      <div className="selection-container">
        <div className="selection">
          <label htmlFor="product">Select Product: </label>
          <select
            id="product"
            value={selectedProductId}
            onChange={(e) => handleProductChange(e)}
          >
            {productData === null ? (
              <option value="" disabled>
                Loading products...
              </option>
            ) : (
              productData.map((product) => (
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
        {/* {productData && monthData &&  />} */}
        <Bar data={chartData} options={options} />
      </div>
    </LineGraphContainer>
  );
};

export default ProductSalesGraph;
