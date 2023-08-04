import styled from "styled-components";

const StyledPanel = styled.div`
	width: 100%;
	background: #fff;
	margin-top: 48px;
	padding: 48px;
	border-radius: 14px;
	border: 1px solid #ddd;
	background: #fff;
	min-height: 500px;
	overflow: auto;
	.addProductBtn {
		margin-top: 78px;
		font-weight: bold;
	}
`;

export const BigTitle = styled.h2`
	color: rgba(0, 32, 86, 0.85);
	font-family: DM Sans;
	font-size: 20px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
`;

export const FieldTitle = styled.h3`
	color: #4e4e4e;
	font-family: DM Sans;
	font-size: 14px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
`;

export const InfoContainer = styled.div`
	margin-top: 32px;
`;

export const InputContainer = styled.div`
	margin-top: 40px;
`;

export const Input = styled.input`
	border-radius: 8px;
	border: 1px solid #e1e1e1;
	font-size: 16px;
	padding: 8px 16px;
	margin-top: 8px;
	width: 100%;
	&:focus {
		outline: 1px solid #0070f3;
	}
`;

export default StyledPanel;
