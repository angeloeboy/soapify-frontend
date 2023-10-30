import styled from "styled-components";

const Table = styled.table`
	width: 100%;
	border: none;
	border-collapse: collapse;
	table-layout: fixed;
	min-width: 1000px;
	width: 100%;
	margin-top: 32px;
`;

export const TableHeadings = styled.th`
	color: #000;
	font-size: 14px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
	padding: 18px 0px;
`;

export const TableData = styled.td`
	color: ${(props) => (props.$bold ? "#002056" : "rgba(0, 32, 86, 0.7)")};
	text-align: center;
	font-size: 14px;
	font-style: normal;
	font-weight: ${(props) => (props.$bold ? "bold" : "400")};
	text-align: ${(props) => (props.$bold ? "left" : "center")};

	line-height: normal;
	padding: 20px 0px;
	border-bottom: 1px solid #dfdfdf;
	position: relative;
	padding-left: ${(props) => (props.bold ? "24px" : "0px")};

	${(props) =>
		props.$withImage &&
		`
        display: flex;
        align-items: center;
        img {
            margin-right: 18px;
            margin-left: 18px
        }
        
    `}

	.attr_container {
		margin-top: 10px;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		span {
			font-size: 12px;
			padding: 4px;
			background-color: #3ea2e44e;
			color: #1b1b1b;
			margin-right: 5px;
			margin-bottom: 5px;
			border-radius: 4px;
		}
	}
`;

export const TableRows = styled.tr`
	border-radius: 4px;
	border-radius: 4px;
	border: ${(props) => (props.$heading ? "1px solid #dfdfdf" : "none")};
	background: ${(props) => (props.$heading ? "#f9f9f9" : "transparent")};
	&:hover {
		background: ${(props) => (props.$heading ? "#f9f9f9" : "#f9f9f9")};
	}
	cursor: ${(props) => (props.$heading ? "default" : "pointer")};
	.ellipsis {
		width: 16px;
		height: 16px;
		padding: 8px;
		border-radius: 20px;
		&:hover {
			background-color: #f9f9f9;
		}
	}
`;

export const ActionContainer = styled.div`
	display: flex;
	/* justify-content: center; */
	/* align-items: center; */
	flex-direction: column;
	/* gap: 16px; */
	cursor: pointer;
	color: #002056;
	font-size: 14px;
	font-style: normal;
	font-weight: 700;
	border-radius: 4px;
	border: 1px solid #dfdfdf;
	background: #ffffff;
	width: 130px;
	/* height: 40px; */
	text-align: left;
	position: absolute;
	left: 50%;
	bottom: 0px;
	transform: translate(-50%, 40%);
	z-index: 2;
	p {
		padding: 8px 16px;
		display: flex;
		align-items: center;
		svg {
			margin-right: 8px;
		}
		&:hover {
			background: #f9f9f9;
		}
	}
`;

export let Status = styled.span`
	display: inline-block;
	padding: 8px;
	border-radius: 6px;
	background-color: ${(props) => (props.$bgColor ? props.$bgColor : "transparent")};
	color: ${(props) => (props.color ? props.color : "#fff")};
	font-weight: bold;
`;

export default Table;
