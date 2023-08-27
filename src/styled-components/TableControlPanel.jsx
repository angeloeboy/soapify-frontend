import styled from "styled-components";

export const TableControlPanel = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 44px;

	p {
		color: #000;
		font-size: 14.22px;
		font-weight: 400;
	}
`;

export const SearchBar = styled.div`
	input {
		width: 592.498px;
		border-radius: 12px;
		border: 1px solid #ddd;
		background: #f8f8f8;
		padding: 16px;
		margin-top: 8px;
	}
`;

export const DropdownWrapper = styled.div`
	min-width: 100px;
	position: relative;
	color: black;
	border-radius: 12px;
	border: none;
	font-size: 14.22px;
	cursor: pointer;
	flex-shrink: 0;
	font-family: Arial;
	background-color: #f8f8f8;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
	padding: 16px;
	margin-top: 8px;
	border: 1px solid #dddddd;
	margin-left: 8px;
	svg {
		margin-right: 8px;
	}
`;

export const DropdownHeader = styled.div`
	background-color: #f5f5f5;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const DropdownMenu = styled.div`
	display: ${(props) => (props.isOpen ? "block" : "none")};
	position: absolute;
	top: 100%;
	left: 0;
	width: 100%;
	border: 1px solid #e0e0e0;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const DropdownItem = styled.div`
	padding: 10px;
	background-color: #fff;
	border-top: 1px solid #e0e0e0;
	cursor: pointer;

	&:hover {
		background-color: #e0e0e0;
	}
`;

export default TableControlPanel;
