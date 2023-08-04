import styled from "styled-components";

const StyledPanel = styled.div`
	width: 100%;
	background: #fff;
	margin-top: 48px;
	padding: 48px;
	border-radius: 14px;
	border: 1px solid #ddd;
	background: #fff;
	.addProductBtn {
		margin-top: 78px;
		font-weight: bold;
	}
`;

export const BigTitle = styled.h2`
	color: rgba(0, 32, 86, 0.85);
	font-family: DM Sans;
	font-size: 24px;
	font-style: normal;
	font-weight: 700;
	padding: 15px;
	margin-top: 23.52px;
	margin-bottom: 23.52px;
	margin-left:24.37px ;
	line-height: normal;
`;

export const FieldTitle = styled.h3`
	color: rgba(0, 32, 86, 0.50);
	font-family: DM Sans;
	font-size: 14px;
	font-style: normal;
	margin-left: 15px;
	font-weight: 500;
	line-height: normal;
 	padding: 15px;
	margin-top: 28px;
	
	 
`;

export const InfoContainer = styled.div`
	margin-top: 32px;
`;

export const InputContainer = styled.div`
	margin-top: 40px;
`;

export const Input = styled.input`
	border-radius: 11px;
	border: 1px solid #EEE;
	padding: 8px 16px;
	margin-left: 24.37px;
	width: 780.824px;
	height: 41px;
	flex-shrink: 0;
	&:focus {
		outline: 1px solid #0070f3;
	}
`;

export default StyledPanel;
