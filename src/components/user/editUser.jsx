import { getRoles } from "@/api/roles";
import { editUser } from "@/api/users";
import {
	Button,
	Select,
	LabelContainer,
	Label,
	Option,
	FieldContainer,
	CloseButton,
	ButtonsContainer,
	PopupOverlay,
	PopupContent,
	HeaderTitle,
	FieldTitleLabel,
	InputHolder,
} from "@/styled-components/ItemActionModal";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// import { getUser, editUser, getUserCategories } from "@/api/users";

const EditUser = ({ selectedUser, onClose, fetchUsers }) => {
	const [user, setUser] = useState({
		first_name: "",
		last_name: "",
		role_id: "",
		password: "",
	});

	const [roles, setRoles] = useState([]);

	const editUserFunc = async (e) => {
		e.preventDefault();

		const res = await editUser(user, selectedUser.id);

		if (res.status === "Success") {
			toast.success("User edited");
			fetchUsers();
			onClose();
			return;
		}

		toast.error(res.message);
	};

	const fetchRoles = async () => {
		const res = await getRoles();

		if (res) {
			setRoles(res.roles);
		}

		console.log(res.roles);
	};

	useEffect(() => {
		fetchRoles();
		setUser({ ...selectedUser, role_id: selectedUser.role.role_id, password: "" });
	}, []);

	const generateStrongPassword = (length) => {
		let password = "";
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}:"<>?[];,./`~';
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			password += characters.charAt(Math.floor(Math.random() * charactersLength));
		}

		setUser({ ...user, password: password });
	};

	return (
		<PopupOverlay>
			<PopupContent>
				<form onSubmit={(e) => editUserFunc(e)}>
					<HeaderTitle>
						Edit User: {user.first_name} {user.last_name}
					</HeaderTitle>
					<FieldContainer>
						<LabelContainer first>
							<Label>General Information</Label>{" "}
						</LabelContainer>
						<div>
							<FieldTitleLabel> First Name </FieldTitleLabel>
							<InputHolder
								type="text"
								onChange={(e) => {
									setUser({ ...user, first_name: e.target.value });
								}}
								required
								value={user.first_name}
							/>
						</div>
						<div>
							<FieldTitleLabel>Last Name</FieldTitleLabel>
							<InputHolder
								type="text"
								onChange={(e) => {
									setUser({ ...user, last_name: e.target.value });
								}}
								required
								value={user.last_name}
							/>
						</div>

						<div>
							<LabelContainer notfirst>
								<Label>Role</Label>{" "}
							</LabelContainer>
							<FieldTitleLabel>Role</FieldTitleLabel>
							<Select
								value={user.role_id}
								onChange={(e) => {
									setUser({ ...user, role_id: e.target.value });
								}}
							>
								{roles.map((role) => (
									<Option value={role.role_id} key={role.role_id}>
										{role.role_name} {role.role_id}
									</Option>
								))}
							</Select>
						</div>
						{Number(user.role_id) !== 1 && Number(user.role_id) !== 2 && (
							<>
								<div>
									<LabelContainer notfirst>
										<Label>Password {user.role_id}</Label>
									</LabelContainer>
									<FieldTitleLabel>Change Password</FieldTitleLabel>
									<InputHolder
										type="text"
										onChange={(e) => {
											setUser({ ...user, password: e.target.value });
										}}
										value={user.password}
									/>
								</div>

								<Button type="button" onClick={() => generateStrongPassword(10)} width="100%">
									Generate password
								</Button>
							</>
						)}
					</FieldContainer>

					<ButtonsContainer>
						<CloseButton onClick={onClose}>Close</CloseButton>
						<Button type="submit">Save</Button>
					</ButtonsContainer>
				</form>
			</PopupContent>
		</PopupOverlay>
	);
};

export default EditUser;
