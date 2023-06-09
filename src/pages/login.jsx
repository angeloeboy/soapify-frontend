import Button from "@/components/button";
import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { login, logout, test } from "@/api/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";

const LoginContainer = styled.div`
	height: 100vh;
	width: 100%;
	max-width: 770px;
	padding: 53px 10vw;
	padding-top: 100px;
	.appTitle {
		text-transform: uppercase;
		padding-bottom: 19px;
		border-bottom: 1px solid rgba(0, 32, 86, 0.12);
		width: 217px;
	}
`;

const Form = styled.form`
	margin-top: 74px;

	h3 {
		font-size: 24px;
		font-weight: 700;
	}

	p {
		color: #b1b1b1;
		font-size: 16px;
		font-weight: 400;
	}

	.formsContainer {
		margin-top: calc(72px - 29px);
		label {
			font-size: 14px;
			font-weight: 500;
			display: block;
			margin-top: 29px;
			background-color: transparent;
		}

		.loginBtn {
			/* max-width: 443px; */
			padding: 14px !important;
			font-size: 16px;
			margin-top: 75px;
		}

		a {
			text-decoration: none;
			color: #005eff;
			text-align: right;
			margin-top: 25px;
			font-size: 14px;
			display: block;
		}

		svg path {
			color: white !important;
		}
	}
`;

const FormField = styled.input`
	display: block;
	width: 100%;
	/* width: 443px; */
	height: 41px;
	border-radius: 11px;
	border: 1px solid ${(props) => (props.error ? "red" : " #eee")};
	margin-top: 9px;
	padding: 10px 21px;
	transition: border 0.2s ease-in-out;
	outline: none;
`;

const Error = styled.p`
	color: red !important;
	font-size: 14px !important;
	margin-top: 10px;
`;

let Login = () => {
	const [credentials, setCredentials] = useState({ username: "", password: "" });
	const [loggingIn, setIsLoggingIn] = useState(false);
	const [errorMessages, setErrorMessages] = useState({
		username: "",
		password: "",
	});

	let router = useRouter();
	const handleLogin = (e) => {
		e.preventDefault();
		setIsLoggingIn(true);
		login(credentials).then((res) => {
			setIsLoggingIn(false);

			if (res.status == "Success") {
				//do actions here
				console.log("success");
				router.push("/dashboard");
				return;
			}

			if (!res.errors) return;
			console.log(res.errors);
			const errors = res.errors;

			const usernameErrorMessage = errors.find((error) => error.path === "username")?.msg;
			const passwordErrorMessage = errors.find((error) => error.path === "password")?.msg;

			setErrorMessages({
				username: usernameErrorMessage || "",
				password: passwordErrorMessage || "",
			});
		});
	};

	return (
		<>
			<LoginContainer>
				<h2 className="appTitle">Soapify</h2>

				<Form onSubmit={(e) => handleLogin(e)}>
					<h3>Log In</h3>
					<p>Enter your username and password to sign in!</p>

					<div className="formsContainer">
						<label htmlFor="username">Username</label>
						<FormField
							type="text"
							onChange={(e) => {
								setCredentials({ ...credentials, username: e.target.value });
								setErrorMessages({ ...errorMessages, username: "" });
							}}
							value={credentials.username}
							id="username"
							name="username"
							error={errorMessages.username ? true : false}
						/>
						{errorMessages.username && <Error>{errorMessages.username}</Error>}

						<label htmlFor="password">Password</label>
						<FormField
							type="password"
							onChange={(e) => {
								setCredentials({ ...credentials, password: e.target.value });
								setErrorMessages({ ...errorMessages, password: "" });
							}}
							value={credentials.password}
							id="password"
							name="password"
							error={errorMessages.password ? true : false}
						/>
						{errorMessages.password && <Error>{errorMessages.password}</Error>}

						<Link href="/">Forgot Password</Link>

						<Button className="loginBtn" width="100%" onClick={(e) => handleLogin(e)}>
							{loggingIn ? <FontAwesomeIcon icon={faSpinner} spin /> : "Log In"}
						</Button>
					</div>
				</Form>

				<Button
					onClick={() => {
						test().then((res) => console.log(res));
					}}
				>
					Click
				</Button>
			</LoginContainer>
		</>
	);
};

export default Login;
