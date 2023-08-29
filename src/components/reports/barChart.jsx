// components/BarChartComponent.js
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

const BarChart = ({ data }) => (
	<div>
		<Bar data={data} />
	</div>
);

export default BarChart;
