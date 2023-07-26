import styled from "styled-components";

const Table = styled.table`
	width: 100%;
	table-layout: fixed;
	margin-top: 32px;
	border-spacing: 0;
	border-collapse: collapse;

	th {
		text-align: center;
		color: #cdcdcd;
		font-size: 14px;
		font-weight: 700;
	}

	tr:not(.tableHeadings) {
		cursor: pointer;
		padding: 0px 16px;

		&:hover {
			background-color: #f8f8f8;
		}
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
		padding-left: 16px;
	}
	tr td:last-child,
	tr th:last-child {
		text-align: right;
		padding-right: 16px;
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

	.actionsContainer {
		position: relative;
		svg {
			margin-right: 21px;
			cursor: pointer;
			opacity: 0.3;
			transition: all 0.3s ease;
			padding: 5px;
			border-radius: 50%;

			&:hover {
				opacity: 1;
				background-color: #f7f7f7;
			}
		}

		.actions {
			position: absolute;
			top: 0px;
			right: 0px;
			transform: translateY(calc(100% - 10px));
			background-color: #fff;
			padding: 10px 8px;
			z-index: 5;
			border: 1px solid #fdfdfd;
			p {
				margin: 2px 0px;
				cursor: pointer;
			}
		}
	}
`;

export default Table;
