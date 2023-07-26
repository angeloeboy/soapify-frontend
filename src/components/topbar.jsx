import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

let TopBarContainer = styled.div`
	padding: 16px 48px;
	width: 100%;
	background: #fff;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid #dddddd;
	background-color: white;

	h2 {
		font-size: 24px;
	}

	.alert-container {
		display: flex;
		align-items: center;
		justify-content: center;

		.profile {
			width: 40px;
			height: 40px;
			background-color: #e5e5e5;
			border-radius: 50%;
			margin-left: 10px;
		}
	}
`;
const TopBar = () => {
	return (
		<TopBarContainer>
			<h3>January 10 2020</h3>
			<div className="alert-container">
				<FontAwesomeIcon icon={faBell} />
				<div className="profile"></div>
			</div>
		</TopBarContainer>
	);
};

export default TopBar;
