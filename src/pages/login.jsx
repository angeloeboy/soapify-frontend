import Button from "@/components/button";
import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { login, logout, test } from "@/api/auth";
import axios from "axios";

const LoginContainer = styled.div`
	height: 100vh;
`;

let Login = () => {
	const [credentials, setCredentials] = useState({ username: "", password: "" });

	const handleLogin = (e) => {
		e.preventDefault();

		login(credentials).then((res) => {
			console.log(res);
		});
	};

	const handleTest = (e) => {
		e.preventDefault();

		test().then((res) => {
			console.log(res);
		});
	};

	const handleLogout = () => {
		// e.preventDefault();

		logout().then((res) => {
			console.log(res);
		});
	};

	return (
		<LoginContainer>
			<input type="text" onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} value={credentials.username} />
			<input type="password" onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} value={credentials.password} />
			<Button onClick={(e) => handleLogin(e)}>Log In</Button>
			<Button onClick={(e) => handleTest(e)}>Test</Button>
			<Button onClick={() => handleLogout()}>Logout</Button>
		</LoginContainer>
	);
};

export default Login;
