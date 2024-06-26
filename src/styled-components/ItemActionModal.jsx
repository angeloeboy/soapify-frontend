import styled from "styled-components";

export const PopupOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black overlay */
	display: flex;
	align-items: center;
	z-index: 102;
	backdrop-filter: blur(2px);
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 999999999;
	background-color: rgba(3, 10, 22, 0.768627451) !important;
`;

export const PopupContent = styled.div`
	background-color: #fff;
	border-radius: 8px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	overflow-y: auto;
	overflow-x: hidden; /* Hide horizontal overflow */
	max-width: 828.924px;
	max-height: 90vh; /* Set the maximum height to 90% of the viewport height */
	display: block;
	flex-shrink: 0;
	margin: 0 auto;
	padding: 0 auto;
	position: fixed;
	right: 20px;
	flex-direction: column;
	/* position: relative; */
	width: calc(100% - 40px);
	height: 90vh;
	form {
		height: 100%;
	}

	.form_fields {
		height: 100%;
	}
`;

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
	margin-right: 23.92px;

	max-width: 780.824px;
	width: calc(100% - (23.92px * 2));
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
	/* width: 700.824px; */
	height: 41px;
	padding: 10px;
	margin-bottom: 10px;
	margin-left: 23.92px;
	display: block;
	border: 1px solid #ccc;
	border-radius: 11px;
	font-size: 16px;
	font-family: DM Sans;
	font-size: 14px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
	margin-right: 23.92px;
	width: calc(100% - (23.92px * 2));
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
	min-height: calc(100% - 200px);
	${InputHolder}:not(:first-child) {
		margin-top: 2px;
	}
`;

export const ProfilePictureContainer = styled.div`
	width: 780.824px;
	width: calc(100% - (23.92px * 2));
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
	height: 45.2px;
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
	width: 130.027px;
	height: auto;
	flex-shrink: 0;
	font-family: Arial;
	background-color: #f8f8f8;
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
	width: 115px;
	height: auto;
	flex-shrink: 0;
	font-family: Arial;
	background-color: #f8f8f8;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
`;

export const ButtonAddProduct = styled.button`
	color: rgba(255, 255, 255, 1);
	border-radius: 12px;
	padding: 10px 20px;
	border: none;
	margin: 5px;
	font-size: 14px; /* Decrease the font size */
	cursor: pointer;
	max-width: 140px;
	height: auto;
	white-space: nowrap;
	flex-shrink: 0;
	font-family: Arial;
	background-color: rgba(26, 105, 240, 1);
	font-style: normal;
	font-weight: 700;
	line-height: normal;

	svg {
		background-color: white;
		margin-right: 6px; /* Add margin to create space between icon and text */
		width: 16px; /* Set the width of the SVG icon */
		height: 16px; /* Set the height of the SVG icon */
	}
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

	background-image: url(${(props) => props.image});
	background-size: cover;
	background-position: center center;
	background-size: contain;
	background-repeat: no-repeat;
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
	box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
	/* position: fixed; */
	margin-top: 130px;
	position: sticky;
	bottom: 0px;
	width: 100%;
	z-index: 9;
	background-color: white;
	padding: 24px 24px 24px 0px;
`;

export const PaginationControl = styled.div`
	display: flex;
	list-style-type: none;
	align-items: center;
	gap: 0.75rem;
	width: 100%;
	justify-content: center;
	margin-top: 2rem;

	button {
		color: #555d67;
		background-color: white;
		border: 1px solid #dfe5e9;
		box-shadow: 0 1px 2px rgba(18, 20, 23, 0.06);
		height: 2rem;
		font-size: 0.813rem;
		font-weight: 500 !important;
		width: 1.85rem;
		align-items: center;
		transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
		border-radius: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		svg {
			/* vertical-align: middle; */
		}

		&:disabled {
			color: #a2aab4;
			background-color: #e8edf0;
			border: none;
			box-shadow: none;
		}
	}

	.active {
		border: 1px solid #1a69f0;
	}
`;

export const CheckboxWrapper = styled.div`
	display: flex;
	align-items: center;
	/* justify-content: center; */
	padding: 4px 1rem;
	margin-top: 10px;
	margin-bottom: 10px;
`;

export const OrdersWrapper = styled.div`
	/* display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%; */
	margin-left: 23.92px;
	margin-right: 23.92px;
	padding: 20px 0px;
	max-width: 780.824px;

	.total {
		text-align: right;
		font-weight: bold;
	}

	span {
		font-size: 14px;
		color: #1a69f0;
	}
`;

export const PaymentInformation = styled.div`
	margin-left: 23.92px;
	margin-right: 23.92px;

	max-width: 780.824px;
`;
