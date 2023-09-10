import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { styled } from "styled-components";

const LineGraphContainer = styled.div`
	border-radius: 8px;
	border: 1px solid #dfdfdf;
	background: #fff;
	padding: 34px;
	margin: 1%;
	.title {
		color: #000;
		font-size: 16px;
		font-weight: 700;
		margin-bottom: 100px;
	}
`;

const LineGraph = ({ annualSalesData }) => {
	// const months = annualSalesData.map((item) => item.month_name);
	// const sales = annualSalesData.map((item) => item.total_amount / 100);

	// // For the gradient
	// const canvas = document.createElement("canvas");
	// const ctx = canvas.getContext("2d");
	// const gradient = ctx.createLinearGradient(0, 0, 0, 400);
	// gradient.addColorStop(0, "rgba(133, 193, 233, 0.9)"); // Start with blue.
	// gradient.addColorStop(1, "rgba(133, 193, 233, 0.1)"); // Fade to transparent.

	// const data = {
	// 	labels: months,
	// 	datasets: [
	// 		{
	// 			label: "Sales (P)",
	// 			data: sales,
	// 			backgroundColor: gradient,
	// 			borderColor: "rgba(133, 193, 233, 1)",
	// 			borderWidth: 2,
	// 			pointBackgroundColor: "rgba(133, 193, 233, 1)",
	// 			pointBorderColor: "#fff",
	// 			pointHoverBackgroundColor: "#fff",
	// 			pointHoverBorderColor: "rgba(133, 193, 233, 1)",
	// 			pointRadius: 5,
	// 			pointHoverRadius: 7,
	// 			fill: "start",
	// 		},
	// 	],
	// };

	// const options = {
	// 	responsive: true,
	// 	maintainAspectRatio: true,
	// 	aspectRatio: 2,
	// 	scales: {
	// 		y: {
	// 			beginAtZero: false,
	// 			title: {
	// 				display: true,
	// 				text: "Sales Amount",
	// 			},
	// 			grid: {
	// 				display: false, // This will remove the horizontal lines
	// 			},
	// 			ticks: {
	// 				stepSize: 100, // You can set this value according to your needs.
	// 			},
	// 		},
	// 		x: {
	// 			title: {
	// 				display: true,
	// 				text: "Month",
	// 			},
	// 			grid: {
	// 				display: false, // This will remove the vertical lines
	// 			},
	// 		},
	// 	},
	// 	plugins: {
	// 		legend: {
	// 			position: "bottom",
	// 		},
	// 		tooltip: {
	// 			mode: "index",
	// 			intersect: false,
	// 		},
	// 		hover: {
	// 			mode: "nearest",
	// 			intersect: true,
	// 		},
	// 	},
	// };

	const chartData = {
		labels: annualSalesData.map((item) => item.month_name),
		datasets: [
			{
				label: "Total Amount",
				data: annualSalesData.map((item) => item.total_amount / 100),
				backgroundColor: "rgba(75, 192, 192, 0.2)",
				borderColor: "rgba(75, 192, 192, 1)",
				borderWidth: 1,
				hoverBackgroundColor: "rgba(75, 192, 192, 0.4)",
				hoverBorderColor: "rgba(75, 192, 192, 1)",
			},
		],
	};

	const options = {
		scales: {
			y: {
				ticks: {
					stepSize: 500,
				},
				grid: {
					display: false,
				},
			},
			x: {
				grid: {
					display: false,
				},
			},
		},
		plugins: {
			legend: {
				display: false,
			},
		},
	};

	return (
		<LineGraphContainer>
			<p className="title">Sales Statistics</p>
			{/* <Line data={data} options={options} /> */}
			<Bar data={chartData} options={options} />
		</LineGraphContainer>
	);
};

export default LineGraph;
