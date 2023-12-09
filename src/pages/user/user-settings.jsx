import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/misc/dashboardLayout";
import StyledPanel from "@/styled-components/StyledPanel";
import { editUser, getUser } from "@/api/users";
import { forgotPassword } from "@/api/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserDashboardLayout from "@/components/misc/userDashboardLayout";
const Field = ({ label, type, value, onChange }) => (
	<div style={styles.field}>
		<label style={styles.label}>{label}</label>
		<input type={type} value={value} onChange={onChange} style={styles.input} />
	</div>
);

const ProfileSettings = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [user, setUser] = useState({
		first_name: "",
		last_name: "",
		email: "",
		phone_number: "",
	});

	const getUserData = async () => {
		const res = await getUser();
		console.log(res.user);
		if (res.error) return;
		if (!res.user) return;
		setUser(res.user);
	};

	const changePassword = async () => {
		const res = await forgotPassword(user.email);

		if (res.error) return;

		if (res.status == "Success") {
			toast.success("Password reset link sent to email");
		}

		console.log(res);
	};

	const editUserFunc = async () => {
		const res = await editUser(user, user.id);

		if (res.error) return;

		if (res.status == "Success") {
			toast.success("Account updated successfully");
		}

		console.log(res);
	};

	useEffect(() => {
		getUserData();
	}, []);

	return (
		<UserDashboardLayout>
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
			<StyledPanel>
				<h2>User Settings</h2>
				<Field label="First Name" type="text" value={user.first_name} readOnly />
				<Field label="Last Name" type="text" value={user.last_name} readOnly />
				<Field
					label="Phone Number"
					type="text"
					value={user.phone_number}
					maxlength="12"
					placeholder="Enter phone number"
					onChange={(e) => {
						const value = e.target.value;
						///remove anything that is not a digit and limit it to 12 digits
						const sanitizedValue = value.replace(/\D/g, "").slice(0, 12);
						setUser({ ...user, phone_number: sanitizedValue });
					}}
					required
				/>
				<button type="button" style={styles.saveButton} onClick={() => editUserFunc()}>
					Save
				</button>

				<button style={styles.saveButton} onClick={() => changePassword()}>
					Change Password
				</button>
			</StyledPanel>
		</UserDashboardLayout>
	);
};

const styles = {
	field: {
		display: "flex",
		flexDirection: "column",
		marginBottom: "10px",
	},
	label: {
		marginBottom: "5px",
	},
	input: {
		width: "50%",
		padding: "10px",
		border: "1px solid #ddd",
		borderRadius: "5px",
	},
	saveButton: {
		backgroundColor: "#002056",
		color: "#fff",
		padding: "10px",
		border: "none",
		minWidth: "100px",
		borderRadius: "5px",
		cursor: "pointer",
		fontSize: "16px",
		marginRight: "10px",
	},
};

export default ProfileSettings;
