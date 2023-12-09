/* eslint-disable react/display-name */
import React, { useContext, useEffect } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { ComponentTitle } from "@/styled-components/pos";
import Button from "../misc/button";
import Image from "next/image";
import { toast } from "react-toastify";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

const StyledDatePicker = styled(DatePicker)`
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

// const PickupDate = (props) => {
// 	const { setActiveAction, transaction, setTransaction } = useContext(TransactionContext);

// 	// Format the date to YYYY-MM-DD
// 	const formatDate = (date) => {
// 		let d = new Date(date),
// 			month = "" + (d.getMonth() + 1),
// 			day = "" + d.getDate(),
// 			year = d.getFullYear();

// 		if (month.length < 2) month = "0" + month;
// 		if (day.length < 2) day = "0" + day;

// 		return [year, month, day].join("-");
// 	};

// 	// Handle date change
// 	const handleDateChange = (e) => {
// 		//cant pick a date before today but can pick today
// 		if (new Date(e.target.value) < new Date().setHours(0, 0, 0, 0)) {
// 			return toast.error("Pickup date cannot be before today");
// 		}

// 		setTransaction({ ...transaction, pickup_date: new Date(e.target.value) });
// 	};

// 	return (
// 		<div className="pickup-date">
// 			<ComponentTitle>
// 				<span onClick={() => props.setActiveAction("cart")}>{"<"}</span> Payment Methods
// 			</ComponentTitle>
// 			<h3>Pickup Date</h3>

// 			<PickupdateHolder type="date" value={formatDate(transaction.pickup_date)} onChange={handleDateChange} />

// 			<Button
// 				width={"100%"}
// 				onClick={() => {
// 					if (transaction.pickup_date == "") return toast.error("Please select a date");
// 					console.log(transaction);
// 					setActiveAction("payment");
// 				}}
// 			>
// 				Confirm date
// 			</Button>
// 		</div>
// 	);
// };

const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
	<input
		ref={ref}
		onClick={onClick}
		value={value}
		readOnly
		style={{
			borderRadius: "11px",
			border: "1px solid #eee",
			padding: "8px 16px",
			maxWidth: "780.824px",
			width: "100%",
			height: "41px",
			marginBottom: "30px",
			// Add any additional styling you need
		}}
	/>
));

const PickupDate = (props) => {
	const { setActiveAction, transaction, setTransaction } = useContext(TransactionContext);

	useEffect(() => {
		console.log(transaction.pickup_date);
	}, [transaction.pickup_date]);

	const disabledDates = [
		new Date(2023, 11, 15), // April 15, 2023
		new Date(2023, 4, 20), // May 20, 2023
		// Add more dates as needed
	];

	const isDateDisabled = (date) => {
		// Disable dates before today
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		if (date < today) {
			return false;
		}

		// Disable specific dates
		return !disabledDates.some(
			(disabledDate) =>
				date.getDate() === disabledDate.getDate() && date.getMonth() === disabledDate.getMonth() && date.getFullYear() === disabledDate.getFullYear()
		);
	};

	const handleDateChange = (date) => {
		setTransaction({ ...transaction, pickup_date: new Date(date) });
	};
	return (
		<div className="pickup-date">
			<ComponentTitle>
				<span onClick={() => props.setActiveAction("cart")}>{"<"}</span> Payment Methods
			</ComponentTitle>
			<h3>Pickup Date</h3>

			<StyledDatePicker
				selected={transaction.pickup_date}
				onChange={handleDateChange}
				dateFormat="yyyy-MM-dd"
				filterDate={isDateDisabled}
				customInput={<CustomInput />}
			/>

			<Button
				width={"100%"}
				onClick={() => {
					if (!transaction.pickup_date) return toast.error("Please select a date");
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
