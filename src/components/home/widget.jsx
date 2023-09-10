import styled from "styled-components";
import Image from "next/image";

const WidgetContainer = styled.div`
	border-radius: 8px;
	border: 1px solid #dfdfdf;
	background: #fff;
	padding: 28px;
	display: inline-block;
	width: ${(props) => `calc(${props.width} - 2%)` || "100%"};
	margin: 1%;
	.title {
		color: #000;
		font-size: 16px;
		font-weight: 700;
		margin-bottom: 35px;
	}

	.stats-container {
		display: flex;
		align-items: center;
		/* justify-content: space-between; */
	}
`;

const Data = styled.div`
	display: flex;
	align-items: center;

	.box {
		margin-right: 16px;
		width: 54.755px;
		height: 54.755px;
		background: #f9f9f9;
	}

	.data-info {
		margin-right: 32px;

		.data-title {
			color: #858080;
			font-size: 14px;
			font-weight: 400;
		}

		.data-value {
			color: #000;
			font-size: 25px;
			font-weight: 700;
		}
	}
`;

const Widget = ({ title, data, width }) => {
	return (
		<WidgetContainer width={width}>
			<p className="title">{title}</p>

			<div className="stats-container">
				{data &&
					data.map((item, i) => {
						return (
							<Data key={i}>
								{/* <Image src="/images/total-transactions.svg" alt="Total Transactions" /> */}
								<div className="box"></div>
								<div className="data-info">
									<p className="data-title">{item.title}</p>
									<p className="data-value">{item.value}</p>
								</div>
							</Data>
						);
					})}
			</div>
		</WidgetContainer>
	);
};

export default Widget;
