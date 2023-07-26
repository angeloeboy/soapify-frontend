import styled from "styled-components";

const Table = styled.table`
	width: 100%;
	table-layout: fixed;
	margin-top: 32px;
	th {
		text-align: center;
		color: #cdcdcd;
		font-size: 14px;
		font-weight: 700;
	}

	td {
		text-align: center;
		color: #002056;
		font-size: 16px;
		font-style: normal;
		font-weight: 700;
		line-height: normal;
	}

	tr td:first-child,
	tr th:first-child {
		text-align: left;
	}
	tr td:last-child,
	tr th:last-child {
		text-align: right;
	}

	.tableHeadings {
		th {
			padding-bottom: 20px;
		}
	}

	td {
		padding: 15px 0px;
	}

	.imgContainer {
		display: flex;
		align-items: center;
		img {
			margin-right: 18px;
		}
	}

	svg {
		margin-left: 21px;
		cursor: pointer;
		opacity: 0.3;
		transition: all 0.3s ease;
		&:hover {
			opacity: 1;
		}
	}
`;

export default Table;
