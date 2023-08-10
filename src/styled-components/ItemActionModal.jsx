import styled from "styled-components";

export const HeaderTitle = styled.h2`
	padding: 15px;
	color: #002056;
	font-family: DM Sans;
	font-size: 24px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
	margin-left: 12px;
`;

export const FieldTitleLabel = styled.h3`
	color: rgba(0, 32, 86, 0.5);
	font-family: DM Sans;
	font-size: 14px;
	font-style: normal;
	margin-left: 12px;
	font-weight: 500;
	line-height: normal;
	padding: 15px;
	margin-top: 14px;
	margin-top: ${(props) => (props.notFirst ? "14px" : "0")};
`;

export const InputHolder = styled.input`
	border-radius: 11px;
	border: 1px solid #eee;
	padding: 8px 16px;
	margin-left: 23.92px;
	width: 780.824px;
	height: 41px;
	flex-shrink: 0;
	&:focus {
		outline: 1px solid #0070f3;
	}
`;

export const Button = styled.button`
	color: #fff;
	font-family: Arial;
	background-color: #1a69f0;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
	border-radius: 8px 12px 12px 12px;
	padding: 10px 20px;
	border: none;
	width: 133px;
	margin: 5px;
	font-size: 16px;
	cursor: pointer;
	width: 50;
`;

export const Select = styled.select`
	color: #1a69f0;
	width: 700.824px;
	height: 41px;
	padding: 10px;
	margin-bottom: 10px;
	margin-left: 23.92px;
	border: 1px solid #ccc;
	border-radius: 11px;
	font-size: 16px;
	font-family: DM Sans;
	font-size: 14px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
`;
export const LabelContainer = styled.div`
	background-color: #f3f3f3;
	border: 1px solid #dfdfdf;
	padding: 15px;
	flex-shrink: 0;
	width: 100%; /* Extend to full width */
	margin-bottom: 8.52px;
	margin-top: 26px;
	margin-top: ${(props) => (props.first ? "10px" : "26px")}; /* Set margin-top based on whether it's the first one */
`;

export const Label = styled.div`
	color: #002056;
	font-size: 16px;
	font-style: normal;
	font-family: DM Sans;
	font-weight: 500;
	line-height: normal;
	display: block;
	margin-left: 11px;
`;

export const Option = styled.option`
	font-family: DM Sans;
	font-size: 14px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
	margin-left: 23.92px;
`;

export const FieldContainer = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	${InputHolder}:not(:first-child) {
		margin-top: 2px;
	}
`;

export const ProfilePictureContainer = styled.div`
	width: 780.824px;
	flex-shrink: 0;
	padding: 10px;
	margin-top: -15px;
`;

export const FileInput = styled.input.attrs({ type: "file" })`
	height: 300px;
	align-items: center;
	justify-content: center;
	padding: 10px;
	border-radius: 10px;
	background-color: #f9f9f9;
	text-align: center;
	max-width: 300px;
	padding: 20px;
	display: none;
	width: 100%;
`;
export const ButtonAddInventory = styled.button`
    color: white;
	border-radius: 12px;
	padding: 10px 20px;
	border: none;
	margin: 5px;
	font-size: 16px;
	cursor: pointer;
	width: 149.027px;
    height: 40.2px;
    flex-shrink: 0;
	font-family: Arial;
	background-color: #1a69f0;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
	
	



`;
export const ButtonAddAccountType = styled.button`
    color: black;
	border-radius: 12px;
	padding: 10px 20px;
	border: none;
	margin: 5px;
	font-size: 16px;
	cursor: pointer;
	width: 149.027px;
    height: 40.2px;
    flex-shrink: 0;
	font-family: Arial;
	background-color: #F8F8F8;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
`;
export const ButtonAddStatus = styled.button`
    color: black;
	border-radius: 12px;
	padding: 10px 20px;
	border: none;
	margin: 5px;
	font-size: 16px;
	cursor: pointer;
	width: 149.027px;
    height: 40.2px;
    flex-shrink: 0;
	font-family: Arial;
	background-color: #F8F8F8;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
`;


export const Centered = styled.div`
	margin-top: 10px;
	display: flex;
	padding: 10px;
	border: 1px solid #ccc;
	border-radius: 10px;
	background-color: #f9f9f9;
	text-align: center;
	justify-content: center;
	align-items: center;
	margin-left: 10px;
	height: 300px;
	width: 100%;
`;

export const SecondaryButton = styled.button`
	color: white;
	background-color: #002056;
	border-radius: 6px;
	padding: 10px 20px;
	border: none;
	margin: 5px;
	font-size: 16px;
	cursor: pointer;
	width: 50%; /* Set width to 100% */
`;

export const CloseButton = styled.button`
	width: 115px;
	color: #1a69f0;
	background-color: white;
	border: 1px solid rgba(26, 105, 240, 1);
	border-radius: 8px;
	height: 40px;
	padding: 10px 20px;
	margin: 5px;
	font-size: 16px;
	font-style: normal;
	font-weight: 700;
	font-family: Arial, Helvetica, sans-serif;
	line-height: normal;
	cursor: pointer;
`;
export const ButtonsContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-top: 222px;
	box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
	/* position: fixed; */
	position: sticky;
	bottom: 0px;
	width: 100%;
	z-index: 9;
	background-color: white;
	padding: 24px 24px 24px 0px;
`;

export const PopupOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black overlay */
	display: flex;
	align-items: center;
`;

export const PopupContent = styled.div`
	background-color: #fff;
	border-radius: 8px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	overflow-y: auto;
	overflow-x: hidden; /* Hide horizontal overflow */
	width: 828.924px;
	max-height: 90vh; /* Set the maximum height to 90% of the viewport height */
	display: block;
	flex-shrink: 0;
	margin: 0 auto;
	padding: 0 auto;
	right: 0;
	/* transform: translateX(40%); */
	position: fixed;
	right: 20px;
	flex-direction: column;
	/* position: relative; */
`;
