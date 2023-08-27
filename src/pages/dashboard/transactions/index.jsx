import DashboardLayout from "@/components/misc/dashboardLayout";
import { useEffect, useState } from "react";

const { getTransactions } = require("@/api/transaction");

const Transactions = () => {
	const [transactions, setTransactions] = useState([]);

	useEffect(() => {
		getTransactions().then((res) => {
			console.log(res);
			// res ? setTransactions(res.transactions) : setTransactions([]);
		});
	}, []);
	return (
		<DashboardLayout>
			<div className="transactions">
				<h2>Transactions</h2>
				<div className="transactions__list">
					{transactions.map((transaction) => (
						<div key={transaction._id} transaction={transaction} />
					))}
				</div>
			</div>
		</DashboardLayout>
	);
};

export default Transactions;
