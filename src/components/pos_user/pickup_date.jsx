/* eslint-disable react/display-name */
import React, { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { ComponentTitle } from "@/styled-components/pos";
import Button from "../misc/button";
import Image from "next/image";
import { toast } from "react-toastify";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { getBusinessDays, getTermsAndConditions } from "@/api/site_settings";
import RenderSlateContent from "../site-settings/renderAbout";

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

const CheckedTermsStyle = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 20px;
	margin-bottom: 20px;
	input {
		margin-right: 10px;
	}
	p {
		font-size: 12px;
		span {
			color: #1a69f0;
			cursor: pointer;
		}
	}
`;

const TermsAndConditionsPopUp = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: #00000099;
	z-index: 99999;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;

	.inner {
		background-color: #fff;
		padding: 20px;
		border-radius: 10px;
		width: 80%;
		height: 80%;
		overflow-y: scroll;
	}

	.close {
		position: absolute;
		top: 10px;
		right: 10px;
		cursor: pointer;
	}

	h4 {
		margin-top: 20px;
		margin-bottom: 10px;
	}
`;
const CheckedTerms = ({ checked, setChecked }) => {
	const [showTerms, setShowTerms] = useState(false);

	return (
		<>
			<p className="sml-p-review">
				Please Review Your Order Carefully Before proceeding to the final step of your purchase, we kindly ask that you carefully review all the items in your
				cart. Ensure that you are fully satisfied with your selection, as this will help avoid any inconvenience or need for order cancellations.
			</p>
			<CheckedTermsStyle>
				<input type="checkbox" value={checked} onChange={() => setChecked(!checked)} />
				<p>
					I have read and agree to the <span onClick={() => setShowTerms(true)}>Terms and Conditions</span>.
				</p>

				{showTerms && <TermsAndConditions close={() => setShowTerms(false)} />}
			</CheckedTermsStyle>
		</>
	);
};

const TermsAndConditions = ({ close }) => {
	const [value, setValue] = useState([
		// {
		// 	type: "paragraph",
		// 	children: [
		// 		{
		// 			text: "This is editable asdfasdf",
		// 		},
		// 	],
		// },
		// {
		// 	type: "paragraph",
		// 	children: [
		// 		{
		// 			text: "",
		// 		},
		// 	],
		// },
		// {
		// 	type: "paragraph",
		// 	children: [
		// 		{
		// 			text: "asdfasdfadfasdf",
		// 		},
		// 	],
		// },
	]);

	const getTermsAndConditionsFunc = async () => {
		const res = await getTermsAndConditions();

		if (!res) return;

		// if (res.status === "Success") {
		// }

		setValue(res.data.terms_and_conditions_text);

		console.log(res.data.terms_and_conditions_text);
	};

	useEffect(() => {
		getTermsAndConditionsFunc();
	}, []);

	return (
		<TermsAndConditionsPopUp>
			<div className="inner">
				<h3>Terms and Conditions</h3>
				{/* <h4>Returns and Refunds:</h4>
				<p>
					We acknowledge that circumstances may vary for each transaction. While we maintain a flexible approach to returns, any requests for refunds will be
					assessed on a case-by-case basis.
				</p>
				<h4>Replacements</h4>

				<p>
					Our commitment is to ensure customer satisfaction. Defective or unsatisfactory products will be considered for replacement, subject to individual
					evaluation.
				</p>

				<h4>Payment Methods</h4>
				<p>
					Payment Methods: We GCASH, and bank transfers on the website for customer transactions. Please note that these payment methods are subject to our
					overall terms and conditions, which users are encouraged to review in full. The terms mentioned above are intended to provide a general overview, and
					the complete terms and conditions document should cover all aspects of your business operations.
				</p> */}

				{value.length > 0 && <RenderSlateContent content={value} />}
			</div>

			<div className="close" onClick={close}>
				<FontAwesomeIcon icon={faClose} />
			</div>
		</TermsAndConditionsPopUp>
	);
};

const PickupDate = (props) => {
	const { setActiveAction, transaction, setTransaction } = useContext(TransactionContext);
	const [checked, setChecked] = useState(false);
	const [businessDays, setBusinessDays] = useState([]);
	const fetchBusinessDates = async () => {
		const res = await getBusinessDays();

		console.log(res);

		if (res.status === "Success") {
			setBusinessDays(res.data.business_days);
		}
	};

	useEffect(() => {
		fetchBusinessDates();
	}, []);

	useEffect(() => {
		console.log(transaction.pickup_date);
	}, [transaction.pickup_date]);

	const disabledDates = [
		new Date(2023, 11, 15), // April 15, 2023
		new Date(2023, 4, 20), // May 20, 2023
		// Add more dates as needed
	];

	// const isDateDisabled = (date) => {
	// 	// Get today's date with time set to midnight
	// 	const today = new Date();
	// 	today.setHours(0, 0, 0, 0);

	// 	if (date < today) {
	// 		return false;
	// 	}

	// 	// Get the day of the week (0 for Sunday, 6 for Saturday)
	// 	const day = date.getDay();

	// 	// Enable weekdays (i.e., disable weekends - Saturday and Sunday)
	// 	if (day === 0 || day === 6) {
	// 		return false;
	// 	}

	// 	// Disable the date if it's in the past or a weekend
	// 	return true;
	// };

	const isDateDisabled = (date) => {
		// Get today's date with time set to midnight
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		if (date < today) {
			return false;
		}

		// Get the day of the week (0 for Sunday, 6 for Saturday)
		const day = date.getDay();

		// Array mapping day indices to day names
		const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

		// Check if the business is closed on this day
		if (!businessDays[dayNames[day]]) {
			return false;
		}

		// Enable the date if it's not in the past and the business is open on this day
		return true;
	};

	const handleDateChange = (date) => {
		setTransaction({ ...transaction, pickup_date: new Date(date) });
	};

	return (
		<div className="pickup-date">
			<ComponentTitle>
				<span onClick={() => props.setActiveAction("cart")}>{"<"}</span> Pick up date
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

					if (!checked) return toast.error("Please check the terms and conditions");
					console.log(transaction);
					setActiveAction("payment");
				}}
			>
				Confirm date
			</Button>

			<CheckedTerms checked={checked} setChecked={setChecked} />
		</div>
	);
};

export default PickupDate;
