import Button from "@/components/misc/button";
import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { logout, test, register } from "@/api/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { toast } from "react-toastify";

const RegisterContainer = styled.div`
	/* height: 100vh; */
	width: 100%;
	max-width: 770px;
	padding: 100px 10vw;

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

		input {
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

let Register = () => {
	const [credentials, setCredentials] = useState({ username: "", firstName: "", lastName: "", password: "", email: "", confirmPassword: "" });
	const [loggingIn, setIsLoggingIn] = useState(false);

	const [errorMessages, setErrorMessages] = useState({
		email: "",
		username: "",
		password: "",
	});

	const handleRegister = (e) => {
		e.preventDefault();
		setIsLoggingIn(true);

		if (credentials.confirmPassword !== credentials.password) {
			setErrorMessages({ ...errorMessages, confirmPassword: "Passwords do not match" });
			setIsLoggingIn(false);
			return;
		}

		register(credentials).then((res) => {
			console.log(res.errors);
			const errors = res?.errors;

			const usernameErrorMessage = errors?.find((error) => error.path === "username")?.msg;
			const passwordErrorMessage = errors?.find((error) => error.path === "password")?.msg;
			const emailErrorMessage = errors?.find((error) => error.path === "email")?.msg;

			setErrorMessages({
				username: usernameErrorMessage || "",
				password: passwordErrorMessage || "",
				email: emailErrorMessage || "",
			});

			console.log(res);

			if (res.status === "Success") {
				console.log("Success");
				toast.success("Account created");
				//redirect to login after 2 seconds
				setTimeout(() => {
					window.location.href = "/login";
				}, 2000);
				return;
			}

			setIsLoggingIn(false);
		});
	};

	return (
		<>
			<RegisterContainer>
				<h2 className="appTitle">Soapify</h2>

				<Form onSubmit={(e) => handleLogin(e)}>
					<h3>Register</h3>
					<p>
						Enter your email and password to register. Then <Link href="/login"> Login </Link>
					</p>

					<div className="formsContainer">
						<label htmlFor="username">First Name</label>
						<FormField
							type="text"
							onChange={(e) => {
								setCredentials({ ...credentials, firstName: e.target.value });
							}}
							value={credentials.firstName}
							id="firstName"
							name="firstName"
						/>

						<label htmlFor="username">Last Name</label>
						<FormField
							type="text"
							onChange={(e) => {
								setCredentials({ ...credentials, lastName: e.target.value });
							}}
							value={credentials.lastName}
							id="lastName"
							name="lastName"
						/>

						<label htmlFor="username">Email</label>
						<FormField
							type="text"
							onChange={(e) => {
								setCredentials({ ...credentials, email: e.target.value });
								setErrorMessages({ ...errorMessages, email: "" });
							}}
							value={credentials.email}
							id="email"
							name="email"
							error={errorMessages.email ? true : false}
						/>
						{errorMessages.email && <Error>{errorMessages.email}</Error>}

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

						<label htmlFor="confirmPassword">Confirm Password</label>
						<FormField
							type="password"
							onChange={(e) => {
								setCredentials({ ...credentials, confirmPassword: e.target.value });
								setErrorMessages({ ...errorMessages, confirmPassword: "" });
							}}
							value={credentials.confirmPassword}
							id="confirmPassword"
							name="confirmPassword"
							error={errorMessages.confirmPassword ? true : false}
						/>
						{errorMessages.confirmPassword && <Error>{errorMessages.confirmPassword}</Error>}

						<Button className="loginBtn" width="100%" onClick={(e) => handleRegister(e)}>
							{loggingIn ? <FontAwesomeIcon icon={faSpinner} spin /> : "Register"}
						</Button>
					</div>
				</Form>

				{/* <Button onClick={(e) => handleTest(e)}>Test</Button>
				<Button onClick={() => handleLogout()}>Logout</Button> */}
			</RegisterContainer>
		</>
	);
};

export default Register;
