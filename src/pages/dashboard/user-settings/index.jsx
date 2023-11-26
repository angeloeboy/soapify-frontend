import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/misc/dashboardLayout";
import StyledPanel from "@/styled-components/StyledPanel";
import { getUser } from "@/api/users";
import { forgotPassword } from "@/api/auth";

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
	});

	const getUserData = async () => {
		const res = await getUser();
		console.log(res.user);
		if (res.error) return;
		if (!res.user) return;
		setUser({
			firstName: res.user.first_name,
			lastName: res.user.last_name,
			email: res.user.email,
		});
	};

	const changePassword = async () => {
		const res = await forgotPassword(user.email);

		console.log(res);
		// setUser({
		// 	firstName: res.user.first_name,
		// 	lastName: res.user.last_name,
		// 	email: res.user.email,
		// });
	};

	useEffect(() => {
		getUserData();
	}, []);

	return (
		<DashboardLayout>
			<StyledPanel>
				<h2>User Settings</h2>
				<Field label="First Name" type="text" value={user.firstName} onChange={(e) => setUser({ ...user, firstName: e.target.value })} />
				<Field label="Last Name" type="text" value={user.lastName} onChange={(e) => setUser({ ...user, firstName: e.target.value })} />
				<Field label="Email" type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
				<button type="button" style={styles.saveButton}>
					Save
				</button>

				<button onClick={() => changePassword()}>Change Password</button>
			</StyledPanel>
		</DashboardLayout>
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
		width: "100px",
		borderRadius: "5px",
		cursor: "pointer",
		fontSize: "16px",
	},
};

export default ProfileSettings;
