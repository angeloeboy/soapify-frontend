import React, { useState, useEffect } from "react";
import {
	Label,
	Button,
	LabelContainer,
	FieldContainer,
	Centered,
	CloseButton,
	ButtonsContainer,
	PopupOverlay,
	PopupContent,
	HeaderTitle,
	FieldTitleLabel,
	InputHolder,
	CheckboxWrapper,
} from "@/styled-components/ItemActionModal";
import { addRoles, getPermissions } from "@/api/roles";
import { toast } from "react-toastify";

const AddRoles = ({ setIsAddPopUpOpen, fetchRoles }) => {
	const [role, setRole] = useState({
		role_name: "",
		permissions: [],
	});

	const [permissions, setPermissions] = useState([]);

	const fetchPermissions = async () => {
		const res = await getPermissions();

		if (res) {
			setPermissions(res.permissions);
			console.log(res.permissions);
		}
	};

	const addRolesFunc = async (e) => {
		e.preventDefault();
		if (role.role_name === "") {
			toast.error("Role name is required");
			return;
		}
		const res = await addRoles(role);
		if (res.status === "Success") {
			toast.success("Role added");
			fetchRoles();
			setIsAddPopUpOpen(false);
			return;
		}

		console.log(res.message);
		fetchRoles();
	};

	useEffect(() => {
		fetchPermissions();
	}, []);

	useEffect(() => {
		console.log(role);
	}, [role]);

	const handleCheckboxChange = (event) => {
		const { value, checked } = event.target;
		setRole((prevRole) => {
			const permissions = new Set(prevRole.permissions);

			if (checked) {
				permissions.add(value);
			} else {
				permissions.delete(value);
			}

			return { ...prevRole, permissions: Array.from(permissions) };
		});
	};

	return (
		<PopupOverlay>
			<PopupContent>
				<form onSubmit={(e) => addRolesFunc(e)}>
					<HeaderTitle>Add Role</HeaderTitle>
					<LabelContainer>
						<Label>Role Information</Label>
					</LabelContainer>
					<FieldContainer>
						<div>
							<FieldTitleLabel>Role name</FieldTitleLabel>
							<InputHolder type="text" value={role.role_name} onChange={(e) => setRole({ ...role, role_name: e.target.value })} />
						</div>

						{permissions.map((permission) => {
							return (
								<div key={permission.module}>
									<LabelContainer>
										<Label>{permission.module.toUpperCase()}</Label>
									</LabelContainer>

									{permission.permissions.map((permission) => {
										return (
											<CheckboxWrapper key={permission.permission_id}>
												<input
													type="checkbox"
													id={permission.permission_id}
													name={permission.permission_name}
													value={permission.permission_id}
													onChange={handleCheckboxChange} // Attach the event handler
												/>
												<label htmlFor={permission.permission_id}> {permission.permission_name}</label>
											</CheckboxWrapper>
										);
									})}
								</div>
							);
						})}
					</FieldContainer>

					<ButtonsContainer>
						<CloseButton onClick={() => setIsAddPopUpOpen(false)}>Close</CloseButton>
						<Button type="submit" onClick={(e) => addRolesFunc(e)}>
							Save
						</Button>
					</ButtonsContainer>
				</form>
			</PopupContent>
		</PopupOverlay>
	);
};

export default AddRoles;
