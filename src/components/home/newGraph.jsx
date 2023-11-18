import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // import the styles
import "react-date-range/dist/theme/default.css"; // import the theme
import { getProducts } from "@/api/products";
import { getAllProductTransactions } from "@/api/home";
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

const mockData = [
  {
    status: "Success",
    transactions: [
      {
        createdAt: "2023-11-17T15:02:51.000Z",
        items: [
          {
            batch_info: '[{"batch_no":"mxglw82445PC-111723-b1","quantity":5}]',
            price: 10000,
            product: {
              product_id: 18,
              product_name: "Max Glow - Pc",
              product_price: 10000,
            },
            product_id: 18,
            quantity: 5,
            transaction_item_id: 10,
          },
        ],
        payment_method: {
          payment_method_id: 2,
          name: "BDO",
        },
        status: "PENDING",
        total_amount: 50000,
        transaction_id: 7,
        transaction_number: "asedf3",
        transaction_unique_id: "T231117230251574GHMUXB",
        transaction_user_name: {
          id: 2,
          first_name: "admin",
          last_name: "admin",
          email: "admin@admin.com",
        },
      },
      {
        createdAt: "2023-11-17T14:51:08.000Z",
        items: [
          {
            batch_info: '[{"batch_no":"mxglw82445PC-111723-b1","quantity":1}]',
            price: 10000,
            product: {
              product_id: 18,
              product_name: "Max Glow - Pc",
              product_price: 10000,
            },
            product_id: 18,
            quantity: 1,
            transaction_item_id: 9,
          },
        ],
        payment_method: {
          payment_method_id: 2,
          name: "BDO",
        },
        status: "PENDING",
        total_amount: 10000,
        transaction_id: 6,
        transaction_number: "dfdfdfdf",
        transaction_unique_id: "T231117225108826K2PUYG",
        transaction_user_name: {
          id: 2,
          first_name: "admin",
          last_name: "admin",
          email: "admin@admin.com",
        },
      },
    ],
  },
];

const DataVisualization = () => {
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
    ],
    datasets: [
      {
        label: "Units Sold",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: [],
      },
    ],
  });
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [aggregationType, setAggregationType] = useState("daily");
  useEffect(() => {
    fetchAllTransactions();
    fetchProducts();
  }, []);

  useEffect(() => {
    setShowDatePicker(aggregationType === "daily");
  }, [aggregationType]);

  const fetchAllTransactions = async () => {
    try {
      const res = await getAllProductTransactions();
      if (Array.isArray(res)) {
        setTransactions(res.transactions);
        console.log("Fetch All Transactions", res.transactions);
      } else {
        setTransactions([]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      if (Array.isArray(res.products)) {
        setProducts(res.products);
        console.log("products", products);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDateRangeChange = (start, end) => {
    // Update the selection range and close the date picker
    setSelectionRange({ startDate: start, endDate: end });
    setShowDatePicker(false);

    // Additional logic based on the selected date range if needed
  };
  // Logic to filter and aggregate data based on selected options
  const filteredTransactions = selectedProduct
    ? transactions.filter(
        (transaction) => transaction.product.product_id === selectedProduct
      )
    : transactions;

  const aggregatedData = {};

  filteredTransactions.forEach((transaction) => {
    const date = new Date(transaction.createdAt);
    let key;

    // Determine the key based on the aggregation type
    if (aggregationType === "daily") {
      key = date.toISOString().split("T")[0];
    } else if (aggregationType === "monthly") {
      key = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`;
    }

    // Initialize the key if it doesn't exist
    if (!aggregatedData[key]) {
      aggregatedData[key] = 0;
    }

    // Increment the value based on the aggregation type (units sold or total amount)
    if (aggregationType === "unitsSold") {
      transaction.transactions.forEach((item) => {
        item.items.forEach((product) => {
          aggregatedData[key] += product.quantity;
        });
      });
    } else if (aggregationType === "sales") {
      transaction.transactions.forEach((item) => {
        item.items.forEach((product) => {
          aggregatedData[key] += product.total_amount;
        });
      });
    }
  });

  // Chart Data
  const chartDataOptions = {
    labels: Object.keys(aggregatedData),
    datasets: [
      {
        label: aggregationType === "unitsSold" ? "Units Sold" : "Sales",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: Object.values(aggregatedData),
      },
    ],
  };

  return (
    // <DataVisualizationContainer>
    <div>
      <select
        value={selectedProduct}
        onChange={(e) => setSelectedProduct(e.target.value)}
      >
        <option value="">Select a Product</option>
        {products.map((product) => (
          <option key={product.product_id} value={product.product_id}>
            {product.product_name}
          </option>
        ))}
      </select>
      <select
        value={aggregationType}
        onChange={(e) => setFilterType(e.target.value)}
      >
        <option value="unitsSold">Units Sold</option>
        <option value="sales">Sales</option>
      </select>
      <select
        value={aggregationType}
        onChange={(e) => {
          setAggregationType(e.target.value);
          // Toggle date range picker based on the selected aggregation type
          setShowDatePicker(e.target.value === "daily");
        }}
      >
        <option value="daily">Daily</option>
        <option value="monthly">Monthly</option>
      </select>

      {showDatePicker && (
        <DateRangePicker
          ranges={[selectionRange]}
          onChange={(ranges) => console.log(ranges)}
        />
      )}
      <Bar data={chartDataOptions} />
    </div>
    // </DataVisualizationContainer>
  );
};

export default DataVisualization;
