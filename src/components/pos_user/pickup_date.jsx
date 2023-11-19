import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { ComponentTitle } from "@/styled-components/pos";
import Button from "../misc/button";
import Image from "next/image";
import { toast } from "react-toastify";
import styled from "styled-components";

const PickupdateHolder = styled.input`
	border-radius: 11px;
	border: 1px solid #eee;
	padding: 8px 16px;
	max-width: 780.824px;
	width: calc(100%);
	height: 41px;
	flex-shrink: 0;
	margin-bottom: 30px;

	&:focus {
		outline: 1px solid #0070f3;
	}
`;

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

		//cant pick a date before today
		if (new Date(e.target.value) < new Date()) {
			return toast.error("Please select a date after today");
		}
		setTransaction({ ...transaction, pickup_date: new Date(e.target.value) });
	};

	return (
		<div className="pickup-date">
			<ComponentTitle>
				<span onClick={() => props.setActiveAction("cart")}>{"<"}</span> Payment Methods
			</ComponentTitle>
			<h3>Pickup Date</h3>

			<PickupdateHolder type="date" value={formatDate(transaction.pickup_date)} onChange={handleDateChange} />

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
