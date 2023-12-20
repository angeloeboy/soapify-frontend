import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

import { getProductStats } from "@/api/home"; // Adjust the import path
import { getProducts } from "@/api/products";

const LineGraphContainer = styled.div`
	border-radius: 8px;
	border: 1px solid #dfdfdf;
	background: #fff;
	padding: 20px;
	width: 98%; /* Adjust width as per your layout */
	height: auto; /* Change the height to auto or adjust to a larger value */
	margin: 10px; /* Adjust margin for spacing */

	.selection {
		display: flex;
		align-items: center;
		margin-bottom: 10px;
	}

	.selection label {
		margin-right: 10px;
		font-size: 14px;
		font-weight: bold;
	}

	.selection select,
	.selection input[type="date"] {
		padding: 8px;
		border-radius: 4px;
		border: 1px solid #ccc;
		font-size: 14px;
	}

	.selection select {
		flex: 1;
		max-width: 200px; /* Adjust as needed */
	}

	.selection input[type="date"] {
		width: 150px; /* Adjust as needed */
	}

	// ... (rest of your code)

	.title {
		color: #000;
		font-size: 20px;
		font-weight: 700;
		margin-bottom: 0px;
		text-align: center; /* Center the title */
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

	const [startDate, setStartDate] = useState("2023-01-01");
	const [endDate, setEndDate] = useState("2023-12-31");

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

	useEffect(() => {
		fetchProducts();
	}, []);

	const fetchProducts = () => {
		getProducts()
			.then((res) => {
				if (Array.isArray(res.products)) {
					setProductData(res.products);

					// Set the default product ID only if it's not already set
					if (selectedProductId == null && res.products.length > 0) {
						setSelectedProductId(res.products[0].product_id);
					}
				} else {
					setProductData([]);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	// const fetchData = async () => {
	// 	try {
	// 		const monthResponse = await getProductStats(selectedProductId, selectedYear);
	// 		console.log(monthResponse);
	// 		setMonthData(monthResponse);
	// 	} catch (error) {
	// 		console.error("Error fetching data", error);
	// 	}
	// };

	// const generateChartData = async () => {
	// 	if (!productData || !monthData || !selectedProductId || !startDate || !endDate) {
	// 		return null;
	// 	}

	// 	const selectedProduct = productData.find((product) => product.product_id === selectedProductId);
	// 	if (!selectedProduct) {
	// 		console.error(`Product with product_id ${selectedProductId} not found`);
	// 		return null;
	// 	}

	// 	const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC"];
	// 	const prices = Array(months.length).fill(selectedProduct.product_price);

	// 	const resultArray = Object.entries(monthData.transactions_with_items).map(([key, value]) => value);

	// 	const salesData = resultArray.map((monthTransaction) => {
	// 		let totalSalesForMonth = 0;
	// 		monthTransaction.forEach((item) => {
	// 			totalSalesForMonth += (item.price / 100) * item.quantity;
	// 		});
	// 		return totalSalesForMonth;
	// 	});

	// 	console.log("salesData", salesData);

	// 	const start = new Date(startDate);
	// 	const end = new Date(endDate);

	// 	const chartData = {
	// 		labels: months.slice(start.getMonth(), end.getMonth() + 1),
	// 		datasets: [
	// 			{
	// 				label: "Sales",
	// 				data: salesData.slice(start.getMonth(), end.getMonth() + 1),
	// 				backgroundColor: "rgba(255, 99, 132, 0.2)",
	// 				borderColor: "rgba(255, 99, 132, 1)",
	// 				borderWidth: 1,
	// 			},
	// 		],
	// 	};

	// 	setChartData(chartData);
	// };

	const fetchData = async () => {
		try {
			const startYear = new Date(startDate).getFullYear();
			const endYear = new Date(endDate).getFullYear();
			let allMonthData = {};

			for (let year = startYear; year <= endYear; year++) {
				const response = await getProductStats(selectedProductId, year);
				if (response.status === "Success") {
					allMonthData[year] = response.transactions;
				} else {
					throw new Error(`Failed to fetch data for year ${year}`);
				}
			}
			console.log(allMonthData);

			setMonthData(allMonthData);
		} catch (error) {
			console.error("Error fetching data", error);
		}
	};

	const generateChartData = () => {
		if (!productData || !monthData || !selectedProductId || !startDate || !endDate) {
			return;
		}

		const selectedProduct = productData.find((product) => product.product_id === selectedProductId);
		if (!selectedProduct) {
			console.error(`Product with product_id ${selectedProductId} not found`);
			return;
		}

		const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC"];
		const start = new Date(startDate);
		const end = new Date(endDate);
		let labels = [];
		let salesData = [];

		for (let year = start.getFullYear(); year <= end.getFullYear(); year++) {
			let startMonth = year === start.getFullYear() ? start.getMonth() : 0;
			let endMonth = year === end.getFullYear() ? end.getMonth() : 11;

			for (let month = startMonth; month <= endMonth; month++) {
				labels.push(`${months[month]} ${year}`);
				let monthSales = monthData[year] && monthData[year][month + 1] ? monthData[year][month + 1] : 0;
				salesData.push(monthSales);
			}
		}

		const chartData = {
			labels: labels,
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

	const options = {
		maintainAspectRatio: true,
		responsive: true,
		layout: {
			padding: {
				bottom: 40, // Add space at the bottom
			},
		},

		scales: {
			x: {
				title: {
					display: true,
					text: "Months",
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
					text: "Product Sales",
					font: {
						size: 16,
						weight: "bold",
					},
				},
				beginAtZero: true,
				// max: ,
			},
		},
		height: 500,
	};

	const addNewYear = () => {
		const newYear = selectableYears[selectableYears.length - 1] + 1;
		selectableYears.push(newYear);
		setSelectedYear(newYear); // Update selectedYear to the new year
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
									{product.product_name} ({product.product_code})
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
