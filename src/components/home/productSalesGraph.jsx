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
    font-size: 16px;
    font-weight: bold;
  }
  .chart-container {
    width: 100%;
    margin-top: 10px; /* Add space between selections and the chart */
  }
`;

const ProductSalesGraph = () => {
  const [chartData, setChartData] = useState({
    labels: [
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
    ], // Labels for months
    datasets: [
      {
        label: "Dataset 1",
        data: [10, 20, 15, 30],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });
  const [productData, setProductData] = useState(null);
  const [monthData, setMonthData] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Initial year
  const [selectedProductId, setSelectedProductId] = useState(null); // New state for selected product
  const selectableYears = [selectedYear];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await getProducts();
        const monthResponse = await getProductStats(
          selectedProductId,
          selectedYear
        );

        setProductData(productResponse.products);
        setMonthData(monthResponse);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [selectedProductId, selectedYear]);
  //get products list from backend
  const data = {
    labels: ["Category A", "Category B", "Category C", "Category D"],
    datasets: [
      {
        label: "Dataset 1",
        data: [10, 20, 15, 30],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  const fetchProducts = () => {
    getProducts()
      .then((res) => {
        console.log(res);
        if (Array.isArray(res.products)) {
          setProductsList(res.products);
          calculateTotalUnitsSold();
          console.log("Products List:", productsList);
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
    console.log("product stats: ", productStats);
    console.log("Product ID:", selectedProduct);
    console.log("Product Transactions", productStats.transactions);

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

  const addNewYear = () => {
    const newYear = selectableYears[selectableYears.length - 1] + 1;
    selectableYears.push(newYear);
    setSelectedYear(newYear); // Update selectedYear to the new year
  };

  const generateChartData = () => {
    console.log("productData:", productData);
    if (!productData || !monthData || !selectedProductId) {
      return null;
    }

    const selectedProduct = productData.find(
      (product) => product.product_id === selectedProductId
    );

    if (!selectedProduct) {
      console.error(`Product with product_id ${selectedProductId} not found`);
      return null;
    }

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    console.log("months:", months);
    const prices = Array(months.length).fill(selectedProduct.product_price);
    const transactions = months.map(
      (month, index) => monthData.transactions[index + 1] || 0
    );
    const salesData = prices.map((price, index) => {
      const transaction = transactions[index];
      const calculatedSale = price * transaction;
      console.log(
        `Month: ${months[index]}, Price: ${price}, Transactions: ${transaction}, Sales: ${calculatedSale}`
      );
      return calculatedSale;
    });

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
          max: 10000,
        },
      },
      height: 500,
    };
  };

  const handleProductChange = (e) => {
    const selectedProductId = e.target.value;
    setSelectedProductId(selectedProductId);
  };

  useEffect(() => {
    const intervalId = setInterval(addNewYear, 1000 * 60 * 60 * 24 * 365); // Add a year every year
    return () => clearInterval(intervalId);
  }, []);

  return (
    <LineGraphContainer>
      <div className="title">Product Sales</div>
      {productData && (
        <div className="totalSales">
          Total Sales for {productData.length} products
        </div>
      )}
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
      <div className="chart-container">
        {/* {productData && monthData &&  />} */}
        <Bar data={chartData} options={options} />
      </div>
    </LineGraphContainer>
  );
};

export default ProductSalesGraph;
