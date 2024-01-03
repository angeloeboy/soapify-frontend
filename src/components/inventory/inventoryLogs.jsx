import StyledPanel from "@/styled-components/StyledPanel";
import PageTitle from "../misc/pageTitle";
import Table, { TableData, TableHeadings, TableRows } from "@/styled-components/TableComponent";

const { getInventoryLogs } = require("@/api/logs");
const { useEffect, useState } = require("react");

const InventoryLogs = ({ inventory }) => {
	const [inventoryLogs, setInventoryLogs] = useState([]);

	const getLogs = async () => {
		const res = await getInventoryLogs();

		console.log(res);
		if (res.status === "Success") {
			setInventoryLogs(res.inventory_logs);
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

	return (
		<div>
			<PageTitle>Inventory Logs</PageTitle>

			<StyledPanel>
				<Table>
					<tbody>
						<TableRows $heading>
							<TableHeadings>Action</TableHeadings>
							<TableHeadings>User</TableHeadings>
							<TableHeadings>Date</TableHeadings>
						</TableRows>

						{inventory &&
							inventory.inventory_logs.map((log) => (
								<TableRows key={log.log_id}>
									<TableData $bold>{log.action}</TableData>
									{/* <TableData>{`${log.user_name.first_name} ${log.user_name.last_name}`} </TableData> */}

									<TableData>{convertToDateFormat(log.created_at)}</TableData>
								</TableRows>
							))}
					</tbody>
				</Table>
			</StyledPanel>
		</div>
	);
};

export default InventoryLogs;
