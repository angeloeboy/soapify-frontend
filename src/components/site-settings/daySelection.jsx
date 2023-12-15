import { editBusinessDays, getBusinessDays } from "@/api/site_settings";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

const Button = styled.div`
	min-width: 100px;
	max-width: 200px;
	padding: 1rem;
	border-radius: 5px;
	border: none;
	display: inline-block;
	margin-right: 5px;
	margin-top: 1rem;
	background-color: ${(props) => (props.$open ? "#34b4eb" : "#fffff")};
	color: ${(props) => (props.$open ? "#fff" : "#000")};
	border: ${(props) => (props.$open ? "1px solid #34b4eb" : "1px solid #000")};
	font-size: 14px;
	text-align: center;
	cursor: pointer;
`;

const SaveButton = styled.button`
	min-width: 100px;
	max-width: 200px;
	padding: 0.5rem 1rem;
	border-radius: 5px;
	border: none;
	display: block;
	margin-right: 5px;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	background-color: rgba(0, 32, 86, 1);
	color: white;
	margin-top: 1rem;
	margin-bottom: 40px;
	&:hover {
		background-color: #012a70;
	}
`;

const DaySelector = () => {
	const [openDays, setOpenDays] = useState({
		sunday: false,
		monday: false,
		tuesday: false,
		wednesday: false,
		thursday: false,
		friday: false,
		saturday: false,
	});

	// Define the order of the days
	const daysOrder = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

	const getOpenDays = async () => {
		const res = await getBusinessDays();
		console.log(res);
		if (res.status === "Success") {
			setOpenDays(res.data.business_days);
		}
	};

	const editOpenDays = async () => {
		const res = await editBusinessDays(openDays);
		if (!res) return;
		console.log(res);
		if (res.status === "Success") {
			// setOpenDays(res.data.business_days);

			toast.success("Business days updated successfully");
		}
	};

	useEffect(() => {
		getOpenDays();
	}, []);

	const toggleDay = (day) => {
		setOpenDays({ ...openDays, [day]: !openDays[day] });
	};

	useEffect(() => {
		console.log(openDays);
	}, [openDays]);

	return (
		<div>
			{daysOrder.map((day) => (
				<Button
					key={day}
					onClick={() => toggleDay(day)}
					// style={{
					// 	backgroundColor: openDays[day] ? "green" : "red",
					// 	margin: "5px",
					// }}
					$open={openDays[day]}
				>
					{day.charAt(0).toUpperCase() + day.slice(1)}
				</Button>
			))}

			<SaveButton onClick={() => editOpenDays()}>Save</SaveButton>
		</div>
	);
};

export default DaySelector;
