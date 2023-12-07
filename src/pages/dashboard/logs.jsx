import DashboardLayout from "@/components/misc/dashboardLayout";
import PageTitle from "@/components/misc/pageTitle";
import StyledPanel from "@/styled-components/StyledPanel";

import Table, { TableData, TableHeadings, TableRows } from "@/styled-components/TableComponent";

const { getInventoryLogs, getLogs } = require("@/api/logs");
const { useEffect, useState } = require("react");

const Logs = ({ inventory }) => {
	const [logs, setlogs] = useState([]);

	const getLogsfunc = async () => {
		const res = await getLogs();
		console.log(res);
		if (res.status === "Success") {
			setlogs(res.logs);
		}
	};

	const convertToDateFormat = (date) => {
		let newDate = new Date(date);
		let formattedDate = newDate.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
		return formattedDate;
	};

	useEffect(() => {
		getLogsfunc();
	}, [inventory]);

	return (
		<DashboardLayout>
			<PageTitle title="Logs" />

			<StyledPanel>
				<Table>
					<tbody>
						<TableRows $heading>
							<TableHeadings>Action</TableHeadings>
							<TableHeadings>Log Type</TableHeadings>

							<TableHeadings>User</TableHeadings>
							<TableHeadings>Date</TableHeadings>
						</TableRows>

						{logs &&
							logs.map((log) => (
								<TableRows key={log.log_id}>
									<TableData $bold>{log.log_description}</TableData>
									<TableData $bold>{log.log_type}</TableData>

									<TableData>{`${log.user.first_name} ${log.user.last_name}`} </TableData>

									<TableData>{convertToDateFormat(log.createdAt)}</TableData>
								</TableRows>
							))}
					</tbody>
				</Table>
			</StyledPanel>
		</DashboardLayout>
	);
};

export default Logs;
