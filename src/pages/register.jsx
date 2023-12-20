import Button from "@/components/misc/button";
import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { logout, test, register } from "@/api/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import NavBar from "@/components/misc/navbar";
const BgContainer = styled.div`
	min-height: 100vh;

	background-position-x: right;
	background-repeat: no-repeat;
	background-size: contain;
	background-attachment: fixed;
	display: flex;
	justify-content: space-between;
	img {
		width: 50%;
		max-width: 800px;
		margin-right: 100px;
	}

	@media (max-width: 800px) {
		img {
			display: none;
		}
	}
`;
const RegisterContainer = styled.div`
	min-height: 100vh;
	width: 100%;
	max-width: 770px;
	padding: 53px 10vw;
	padding-top: 50px;
	padding-bottom: 100px;
	height: 100%;
	background-color: #f5f5f5;
	padding-top: 150px;

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
	const [credentials, setCredentials] = useState({ firstName: "", lastName: "", password: "", email: "", confirmPassword: "", phone_number: "" });
	const [loggingIn, setIsLoggingIn] = useState(false);

	const [errorMessages, setErrorMessages] = useState({
		email: "",
		username: "",
		password: "",
		phone_number: "",
	});

	const handleRegister = async (e) => {
		e.preventDefault();
		setIsLoggingIn(true);

		//check if all the fields are filled, if not, return and create toast error
		if (
			!credentials.firstName ||
			!credentials.lastName ||
			!credentials.password ||
			!credentials.email ||
			!credentials.confirmPassword ||
			!credentials.phone_number
		) {
			toast.error("Please fill in all the fields");
			setIsLoggingIn(false);

			return;
		}

		// Email validation
		const emailRegex = /\S+@\S+\.\S+/;
		if (!emailRegex.test(credentials.email)) {
			setErrorMessages({ ...errorMessages, email: "Invalid email" });
			setIsLoggingIn(false);
			return;
		}

		// Password confirmation check
		if (credentials.confirmPassword !== credentials.password) {
			setErrorMessages({ ...errorMessages, confirmPassword: "Passwords do not match" });
			setIsLoggingIn(false);
			return;
		}

		try {
			const res = await register(credentials);

			const errors = res?.errors;
			const usernameErrorMessage = errors?.find((error) => error.path === "username")?.msg;
			const passwordErrorMessage = errors?.find((error) => error.path === "password")?.msg;
			const emailErrorMessage = errors?.find((error) => error.path === "email")?.msg;

			setErrorMessages({
				username: usernameErrorMessage || "",
				password: passwordErrorMessage || "",
				email: emailErrorMessage || "",
			});

			if (res.status === "Success") {
				toast.success("Registration successful. Redirecting to login page...");
				setTimeout(() => {
					window.location.href = "/login";
				}, 2000);
			}
		} catch (error) {
			console.error("Registration error:", error);
			// Optionally handle errors like network issues here
		} finally {
			setIsLoggingIn(false);
		}
	};

	return (
		<>
			<BgContainer>
				<NavBar />
				<RegisterContainer>
					<h2 className="appTitle">Soapify</h2>
					<ToastContainer
						position="top-right"
						autoClose={2000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme="light"
						className="toast-container"
					/>

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
								required
								error={errorMessages.firstName ? true : false}
							/>
							{errorMessages.firstName && <Error>{errorMessages.firstName}</Error>}

							<label htmlFor="username">Last Name</label>
							<FormField
								type="text"
								onChange={(e) => {
									setCredentials({ ...credentials, lastName: e.target.value });
								}}
								value={credentials.lastName}
								id="lastName"
								name="lastName"
								required
								error={errorMessages.lastName ? true : false}
							/>
							{errorMessages.lastName && <Error>{errorMessages.lastName}</Error>}

							<label htmlFor="username">Email</label>
							<FormField
								type="email"
								onChange={(e) => {
									setCredentials({ ...credentials, email: e.target.value });
									setErrorMessages({ ...errorMessages, email: "" });
								}}
								value={credentials.email}
								id="email"
								name="email"
								error={errorMessages.email ? true : false}
								required
							/>
							{errorMessages.email && <Error>{errorMessages.email}</Error>}

							<label htmlFor="phone_number">Phone Number</label>
							<FormField
								type="text"
								onChange={(e) => {
									const value = e.target.value;
									///remove anything that is not a digit and limit it to 12 digits
									const sanitizedValue = value.replace(/\D/g, "").slice(0, 12);
									setCredentials({ ...credentials, phone_number: sanitizedValue });
								}}
								value={credentials.phone_number}
								id="phone_number"
								name="phone_number"
								required
								error={errorMessages.phone_number ? true : false}
							/>
							{errorMessages.phone_number && <Error>{errorMessages.phone_number}</Error>}
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
								required
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
								required
							/>
							{errorMessages.confirmPassword && <Error>{errorMessages.confirmPassword}</Error>}

							<Button className="loginBtn" width="100%" onClick={(e) => handleRegister(e)}>
								{loggingIn ? <Image src="/loading.svg" alt="loading" width="20" height="20" /> : "Register"}
							</Button>
						</div>
					</Form>

					{/* <Button onClick={(e) => handleTest(e)}>Test</Button>
				<Button onClick={() => handleLogout()}>Logout</Button> */}
				</RegisterContainer>

				<img src="/bg1.svg" />
			</BgContainer>
		</>
	);
};

export default Register;
