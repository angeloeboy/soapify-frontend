import React, { useState, useRef } from "react";

import {
	Button,
	Select,
	LabelContainer,
	Label,
	Option,
	FieldContainer,
	ProfilePictureContainer,
	FileInput,
	Centered,
	SecondaryButton,
	CloseButton, // Corrected import for CloseButton
	ButtonsContainer,
	PopupOverlay,
	PopupContent,
	HeaderTitle,
	FieldTitleLabel,
	InputHolder,
} from "@/styled-components/ItemActionModal";
import { createUser } from "@/api/users";
import { toast } from "react-toastify";

const AddUser = ({ setisAddUserOpen, fetchUsers, onClose }) => {
	const [user, setUser] = useState({
		first_name: "",
		last_name: "",
		password: "",
		email: "",
	});

	const createUserFunc = async (e) => {
		e.preventDefault();
		const response = await createUser(user);

		console.log(response);

		if (!response) {
			return;
		}

		if (response.errors) {
			toast.error(response.errors[0].message);
			return;
		}

		setisAddUserOpen(false);
		toast.success("User added successfully!");

		fetchUsers();
	};

	const createRandomPassword = () => {
		fetchUsers();
		const randomPassword = Math.random().toString(36).slice(-8);
		setUser({ ...user, password: randomPassword });
	};

	return (
		<PopupOverlay>
			<PopupContent>
				<form onSubmit={(e) => createUserFunc(e)}>
					<HeaderTitle>Add User </HeaderTitle>
					<FieldContainer>
						<LabelContainer first>
							<Label>General Information</Label>
						</LabelContainer>
						<div>
							<FieldTitleLabel>First Name</FieldTitleLabel>
							<InputHolder
								type="text"
								placeholder="Enter your First Name"
								value={user.first_name}
								onChange={(e) => setUser({ ...user, first_name: e.target.value })}
							/>
						</div>
						<div>
							<FieldTitleLabel notFirst>Last Name</FieldTitleLabel>
							<InputHolder
								type="text"
								placeholder="Enter your Last Name"
								value={user.last_name}
								onChange={(e) => setUser({ ...user, last_name: e.target.value })}
							/>
						</div>
						<div>
							<FieldTitleLabel notFirst>Email</FieldTitleLabel>
							<InputHolder type="email" placeholder="Enter email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
						</div>
						<LabelContainer>
							<Label>Password</Label>
						</LabelContainer>
						<div>
							<FieldTitleLabel notFirst>Password</FieldTitleLabel>
							<InputHolder
								type="text"
								placeholder="Enter your Password"
								value={user.password}
								onChange={(e) => setUser({ ...user, password: e.target.value })}
							/>
						</div>

						<Button type="button" onClick={() => createRandomPassword()}>
							Generate Password
						</Button>
					</FieldContainer>

					<ButtonsContainer>
						<CloseButton type="button" onClick={() => setisAddUserOpen(false)}>
							Close
						</CloseButton>
						<Button type="submit" onClick={(e) => createUserFunc(e)}>
							Save
						</Button>
					</ButtonsContainer>
				</form>
			</PopupContent>
		</PopupOverlay>
	);
};

export default AddUser;
