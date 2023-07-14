import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

let TopBarContainer = styled.div`
	padding: 20px 50px;
	width: 90%;
	max-width: 1117px;
	border-radius: 12px;
	background: #fff;
	box-shadow: 0px 4px 4px 0px rgba(224, 224, 224, 0.25);
	position: fixed;
	top: 30px;
	right: 5%;
	display: flex;
	align-items: center;
	justify-content: space-between;
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
const TopBar = (props) => {
	return (
		<TopBarContainer>
			<h2>{props.pageName}</h2>
			<div className="alert-container">
				<FontAwesomeIcon icon={faBell} />
				<div className="profile"></div>
			</div>
		</TopBarContainer>
	);
};

export default TopBar;
