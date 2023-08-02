import styled from "styled-components";

const Table = styled.table`
	width: 100%;
	table-layout: fixed;
	margin-top: 32px;
	border-spacing: 0;
	border-collapse: collapse;
`;

export const TableHead = styled.th`
	border-radius: 4px;
	color: #000;
	font-size: 14px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
	padding: 16px 0px;

	&:first-child {
		text-align: left;
		padding-left: 30px;
	}
`;

export const TableData = styled.td`
	border-bottom: 1px solid #ededed;
	padding: 32px 0px;
	text-align: center;
	color: ${(props) => (props.bold ? "#002056" : "rgba(0, 32, 86, 0.70)")};
	font-family: Arial;
	font-size: 14px;
	font-style: normal;
	font-weight: ${(props) => (props.bold ? "700" : "400")};
	line-height: normal;
	position: relative;
	&:first-child {
		display: flex;
		align-items: center;

		img {
			margin-right: 24px;
		}
	}
	svg {
		width: 20px;
		height: 20px;
		padding: 4px;
		&:hover {
			background-color: #e9e9e9;
			border-radius: 20px;
		}
	}
`;

export const ActionList = styled.div`
	position: absolute;
	bottom: 0;
	left: 50%;
	background: #fff;
	border-radius: 5px;
	border: 1px solid #f4f4f4;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	z-index: 1;
	width: 100px;

	transition: all 0.2s ease-in-out;
	/* transform: translateY(-10px); */
	transform: translate(-50%, 60%);

	p {
		padding: 8px;
		transition: all 0.3s ease;
		width: 100%;
		text-align: left;
		display: flex;
		align-items: center;
		&:hover {
			background-color: #e9e9e9;
		}

		svg {
			width: 14px;
			height: 14px;
			padding: 4px;
			margin-right: 8px;
			&:hover {
				background-color: #e9e9e9;
				border-radius: 20px;
			}
		}
	}
`;
export const TableRow = styled.tr`
	cursor: pointer;
	background: ${(props) => (props.heading ? "#f9f9f9" : "transparent")};
`;

export const Status = styled.span`
	display: inline-block;
	padding: 4px 8px;
	border-radius: 4px;
	background-color: ${(props) => (props.bgColor ? props.bgColor : "transparent")};
	color: ${(props) => (props.textColor ? props.textColor : "black")};
	font-weight: bold;
`;
export default Table;
