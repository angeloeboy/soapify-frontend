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
import { addRoles, editRoles, getPermissions } from "@/api/roles";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const EditRoles = ({ setIsEditPopUpOpen, fetchRoles, clickedRole }) => {
	const [role, setRole] = useState({
		role_id: "",
		role_name: "",
		permissions: [],
	});

	const [permissions, setPermissions] = useState([]);

	const fetchPermissions = async () => {
		const res = await getPermissions();

		if (res) {
			setPermissions(res.permissions);
		}
	};

	const editRole = async (e) => {
		e.preventDefault();
		console.log(role);
		const res = await editRoles(role);
		console.log(res.message);
		fetchRoles();

		toast.success("Role successfully edited");
		setIsEditPopUpOpen(false)
	};

	useEffect(() => {
		fetchPermissions();

		let role_name = clickedRole.role_name;
		let permissions = clickedRole.permissions;
		let role_id = clickedRole.role_id;
		let permissionIds = permissions.map((permission) => {
			return permission.permission_id;
		});

		setRole({ role_id: role_id, role_name: role_name, permissions: permissionIds });
	}, []);

	// useEffect(() => {
	// 	console.log(role);
	// }, [role]);

	useEffect;

	const handleCheckboxChange = (event) => {
		const { value, checked } = event.target;
		setRole((prevRole) => {
			const permissions = new Set(prevRole.permissions);

			if (checked) {
				permissions.add(parseInt(value));
			} else {
				permissions.delete(value);
			}

			return { ...prevRole, permissions: Array.from(permissions) };
		});
	};

	return (
		<PopupOverlay>
			<PopupContent>
				<form onSubmit={(e) => editRole(e)}>
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
													onChange={handleCheckboxChange}
													checked={role.permissions.includes(permission.permission_id)}
												/>
												<label htmlFor={permission.permission_id}>{permission.permission_name}</label>
											</CheckboxWrapper>
										);
									})}
								</div>
							);
						})}
					</FieldContainer>

					<ButtonsContainer>
						<CloseButton onClick={() => setIsEditPopUpOpen(false)}>Close</CloseButton>
						<Button type="submit" onClick={(e) => editRole(e)}>
							Save
						</Button>
					</ButtonsContainer>
				</form>
			</PopupContent>
		</PopupOverlay>
	);
};

export default EditRoles;
