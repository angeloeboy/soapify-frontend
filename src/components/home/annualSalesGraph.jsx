import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { styled } from "styled-components";

const LineGraphContainer = styled.div`
	border-radius: 8px;
	border: 1px solid #dfdfdf;
	background: #fff;
	padding: 20px;
	width: 98%; /* Adjust width as per your layout */
	height: 900px; /* Adjust height as needed */
	margin: 10px; /* Adjust margin for spacing */
	.title {
		color: #000;
		font-size: 20px;
		font-weight: 700;
		margin-bottom: 0px;
		text-align: center;
	}
	.totalSales {
		font-size: 16px;
		font-weight: bold;
	}
`;

const AnnualSalesGraph = ({ annualSalesData }) => {
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	const formattedData = months.map((month) => {
		const dataForMonth = annualSalesData.find((item) => item.month_name === month);
		return dataForMonth ? dataForMonth.total_amount / 100 : 0;
	});

	const totalSales = formattedData.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

	const chartData = {
		labels: months,
		datasets: [
			{
				label: "Revenue",
				data: formattedData,
				backgroundColor: "rgba(75, 192, 192, 0.2)",
				borderColor: "rgba(75, 192, 192, 1)",
				borderWidth: 1,
				hoverBackgroundColor: "rgba(75, 192, 192, 0.4)",
				hoverBorderColor: "rgba(75, 192, 192, 1)",
			},
		],
	};

	const options = {
		layout: {
			padding: {
				bottom: 40, // Add space at the bottom
			},
		},
		scales: {
			y: {
				ticks: {
					stepSize: 500,
				},
				grid: {
					display: true,
				},
			},
			x: {
				grid: {
					display: true,
				},
			},
		},
		plugins: {
			legend: {
				display: true,
			},
		},
	};

	return (
		<LineGraphContainer>
			<p className="title">Annual Sales</p>
			<p className="totalSales">Total Sales: ₱ {totalSales.toFixed(2)}</p>

			<Bar data={chartData} options={options} />
		</LineGraphContainer>
	);
};

export default AnnualSalesGraph;

// /ADJUST THE WIDHT AND HEIGHT OF EACH LINE GRAPH CONTAINER  TO FULLY ENCAPSULATES ALL THE SPACE IN THE DASHBOARD AND ALIGN IT WITH OTHER COMPONENTS
