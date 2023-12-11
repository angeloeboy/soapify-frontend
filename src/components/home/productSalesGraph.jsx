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
	const [startDate, setStartDate] = useState(""); // State for start date
	const [endDate, setEndDate] = useState("");
	const selectableYears = [selectedYear];

	useEffect(() => {
		fetchData();
		fetchProducts();
	}, [selectedProductId, selectedYear, startDate, endDate]);

	useEffect(() => {
		generateChartData();
	}, [productData, monthData, selectedProductId, startDate, endDate]);

	const handleStartDateChange = (e) => {
		setStartDate(e.target.value);
	};

	const handleEndDateChange = (e) => {
		setEndDate(e.target.value);
	};

	//get products list from backend

	const fetchProducts = () => {
		getProducts()
			.then((res) => {
				if (Array.isArray(res.products)) {
					setProductData(res.products);
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
			const monthResponse = await getProductStats(selectedProductId, selectedYear);
			console.log(monthResponse);
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
				// max: 5000,
			},
		},
		height: 500,
	};

	const addNewYear = () => {
		const newYear = selectableYears[selectableYears.length - 1] + 1;
		selectableYears.push(newYear);
		setSelectedYear(newYear); // Update selectedYear to the new year
	};

	const generateChartData = async () => {
		if (!productData || !monthData || !selectedProductId || !startDate || !endDate) {
			return null;
		}

		const selectedProduct = productData.find((product) => product.product_id === selectedProductId);
		if (!selectedProduct) {
			console.error(`Product with product_id ${selectedProductId} not found`);
			return null;
		}

		const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC"];
		const prices = Array(months.length).fill(selectedProduct.product_price);

		// Logic to filter data within the specified date range
		// const filteredTransactions = Array.isArray(monthData.transactions)
		// 	? monthData.transactions.filter((transaction) => {
		// 			const transactionDate = new Date(transaction.date); // Replace 'date' with your actual date field
		// 			const startDateObj = new Date(startDate);
		// 			const endDateObj = new Date(endDate);

		// 			return transactionDate >= startDateObj && transactionDate <= endDateObj;
		// 	  })
		// 	: [];

		// console.log("Filtered transactions", filteredTransactions);

		// const salesData = months.map((month) => {
		// 	const monthTransactions = filteredTransactions.filter((transaction) => transaction.month === month);
		// 	const totalSalesForMonth = monthTransactions.reduce((total, transaction) => {
		// 		// Calculate total sales for the month based on your transaction structure
		// 		return total + transaction.amount; // Replace 'amount' with your transaction amount field
		// 	}, 0);
		// 	return totalSalesForMonth;
		// });

		// const salesData = months.map((month, i) => {
		// 	let index = i + 1;

		// 	const monthTransaction = monthData.transaction_with_items[index];

		// 	console.log("monthTransaction", monthTransaction);
		// });

		//make transaction_with_items an array

		// const resultArray = [].concat(...Object.values(monthData.transactions_with_items));
		const resultArray = Object.entries(monthData.transactions_with_items).map(([key, value]) => value);

		const salesData = resultArray.map((monthTransaction) => {
			let totalSalesForMonth = 0;
			monthTransaction.forEach((item) => {
				totalSalesForMonth += (item.price / 100) * item.quantity;
			});
			return totalSalesForMonth;
		});

		console.log("salesData", salesData);

		const start = new Date(startDate);
		const end = new Date(endDate);

		const chartData = {
			labels: months.slice(start.getMonth(), end.getMonth() + 1),
			datasets: [
				{
					label: "Sales",
					data: salesData.slice(start.getMonth(), end.getMonth() + 1),
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
					<select id="product" value={selectedProductId} onChange={(e) => handleProductChange(e)}>
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
					<label htmlFor="start-date">Start Date:</label>
					<input type="date" id="start-date" value={startDate} onChange={handleStartDateChange} />
				</div>
				<div className="selection">
					<label htmlFor="end-date">End Date:</label>
					<input type="date" id="end-date" value={endDate} onChange={handleEndDateChange} />
				</div>
			</div>
			<div className="chart-container">
				<Bar data={chartData} options={options} />
			</div>
		</LineGraphContainer>
	);
};

export default ProductSalesGraph;
