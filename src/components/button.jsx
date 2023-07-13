import styled from "styled-components";

const Button = styled.button`
	color: white;
	background-color: #002056;
	border-radius: 4px;
	padding: 10px 20px;
	border: none;
	font-size: 16px;
	cursor: pointer;

	/* you can use props to customize the button */
	width: ${(props) => props.width || "initial"};
`;

export default Button;
