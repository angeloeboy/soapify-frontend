import Button from "@/components/button";
import React from "react";
import styled from "styled-components";

const LoginContainer = styled.div`
	height: 100vh;
`;

let Login = () => {
	return (
		<LoginContainer>
			<Button onClick={() => console.log("Button clicked!")}>Click me</Button>
		</LoginContainer>
	);
};

export default Login;
