import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { ComponentTitle } from "@/styled-components/pos";
import Button from "../misc/button";
import Image from "next/image";
import { toast } from "react-toastify";

const PickupDate = (props) => {
	const { setActiveAction, transaction, setTransaction } = useContext(TransactionContext);

	// Format the date to YYYY-MM-DD
	const formatDate = (date) => {
		let d = new Date(date),
			month = "" + (d.getMonth() + 1),
			day = "" + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) month = "0" + month;
		if (day.length < 2) day = "0" + day;

		return [year, month, day].join("-");
	};

	// Handle date change
	const handleDateChange = (e) => {
		// Convert the string back to a Date object
		setTransaction({ ...transaction, pickup_date: new Date(e.target.value) });
	};

	return (
		<div className="pickup-date">
			<ComponentTitle>
				<span onClick={() => props.setActiveAction("cart")}>{"<"}</span> Payment Methods
			</ComponentTitle>
			<h3>Pickup Date</h3>
			<input type="date" value={formatDate(transaction.pickup_date)} onChange={handleDateChange} />

			<Button
				width={"100%"}
				onClick={() => {
					if (transaction.pickup_date == "") return toast.error("Please select a date");
					console.log(transaction);
					setActiveAction("payment");
				}}
			>
				Confirm date
			</Button>
		</div>
	);
};

export default PickupDate;
