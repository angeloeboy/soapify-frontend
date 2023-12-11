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
  width: 48%; /* Adjust width as per your layout */
  height: 600px;
  margin: 0 auto; /* Center the container horizontally */

  .title {
    color: #000;
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 10px;
    text-align: center; /* Center the title */
  }

  .totalSales {
    font-size: 14px;
    font-weight: bold;
    text-align: center; /* Center the totalSales */
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

	const [startDate, setStartDate] = useState('2023-01-01');  
	const [endDate, setEndDate] = useState('2023-12-31'); // State for end date

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

	const handleStartDateChange = (e) => {
		setStartDate(e.target.value);
	  };
	  const handleEndDateChange = (e) => {
		setEndDate(e.target.value);
	  };

	const calculateTotalUnitsSold = async () => {
		let totalSold = 0;
		for (const product of productsList) {
			const productStats = await getProductStats(product.product_id, selectedYear);
			if (productStats.transactions) {
				totalSold += Object.values(productStats.transactions).reduce((acc, value) => acc + value, 0);
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
	}, [selectedProduct, selectedYear, startDate, endDate]);

	 

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
		const productStats = await getProductStats(selectedProduct, selectedYear, startDate, endDate);
	
		if (!productStats.transactions || Object.keys(productStats.transactions).length === 0) {
			setChartData({
				labels: [],
				datasets: [],
			});
			console.log("No data available");
			return;
		}
	
		const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		const initialData = Array(labels.length).fill(0);
		const data = productStats.transactions ? Object.values(productStats.transactions) : initialData;
	
		// Create Date objects from the start and end date strings
		const start = new Date(startDate);
		const end = new Date(endDate);
	
		// Filter data based on the selected date range
		const filteredData = data.slice(start.getMonth(), end.getMonth() + 1);
	
		setChartData({
			labels: labels.slice(start.getMonth(), end.getMonth() + 1),
			datasets: [
				{
					label: "Units Sold",
					data: filteredData,
					borderColor: "rgb(75, 192, 192)",
					fill: false,
				},
			],
		});
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
			<p className="totalSales" style={{ fontSize: "14px", fontWeight: "bold" }}>
				Total Units Sold: {totalUnitsSold}
			</p>
			<div className="selection-container">
				<div className="selection">
					<label htmlFor="product">Select Product: </label>
					<select id="product" value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
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
					<label htmlFor="start-date">Start Date:</label>
					<input
					type="date"
					id="start-date"
					value={startDate}
					onChange={handleStartDateChange}
					/>
				</div>
				<div className="selection">
					<label htmlFor="end-date">End Date:</label>
					<input
					type="date"
					id="end-date"
					value={endDate}
					onChange={handleEndDateChange}
					/>
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
