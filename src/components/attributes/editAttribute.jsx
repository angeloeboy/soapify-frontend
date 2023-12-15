import React, { useEffect, useState } from "react";
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
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { editAttribute } from "@/api/attributes";
import { toast } from "react-toastify";

const ButtonTwo = styled.button`
	background-color: #0b20dd;
	color: #fff;
	padding: 10px;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	font-size: 16px;
	margin-top: 10px;
	margin-left: 24px;
	margin-right: 6px;
	width: 100px;
`;

const AttrValue = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0px 8px;
	font-size: 10px;
	cursor: pointer;

	svg {
		margin-right: 8px;
	}
`;

const EditAttribute = ({ onClose, fetchAttributes, selectedAttr }) => {
	const [attribute, setAttribute] = useState({
		attribute_name: "",
		requires_additional_value: false,
		input_type: "none",
		values: [],
	});

	const [attributeValue, setAttributeValue] = useState({
		attribute_value: "",
	});

	useEffect(() => {
		setAttribute(selectedAttr);
	}, [selectedAttr]);

	useEffect(() => {
		console.log(attribute);
	}, [attribute]);

	const handleFormSubmit = (e) => {
		e.preventDefault();

		if (attribute.attribute_name == "") return toast.error("Attribute name is required");
		//check if values is empty
		if (attribute.values.length == 0) return toast.error("Attribute values is required");

		console.log(attribute);
		editAttribute(selectedAttr.attribute_id, attribute)
			.then((res) => {
				console.log(res);

				if (res.error) return toast.error(res.error);
				toast.success("Attribute edited successfully");
				fetchAttributes();
				onClose();
			})
			.then(() => {});
	};

	const addValue = (value) => {
		let values = attribute.values;

		if (value == "") return;

		if (values.includes(value)) return;

		values.push(value);
		setAttribute({ ...attribute, values: values });
		setAttributeValue({ attribute_value: "" });
	};

	const deleteValue = (index) => {
		let values = attribute.values;
		//delete by index
		values.splice(index, 1);
		setAttribute({ ...attribute, values: values });
	};

	return (
		<PopupOverlay>
			<PopupContent>
				<form onSubmit={(e) => handleFormSubmit(e)}>
					<HeaderTitle>Edit Attribute</HeaderTitle>
					<FieldContainer>
						<LabelContainer first>
							<Label>Attribute Information</Label>{" "}
						</LabelContainer>
						<div>
							<FieldTitleLabel notFirst>Attribute Name</FieldTitleLabel>
							<InputHolder type="text" onChange={(e) => setAttribute({ ...attribute, attribute_name: e.target.value })} value={attribute.attribute_name} />
						</div>
						{/* <div>
							<FieldTitleLabel notFirst>Requires Additional Value</FieldTitleLabel>
							<Select
								value={attribute.requires_additional_value}
								onChange={(e) => {
									// setAttribute({ ...attribute, requires_additional_value: e.target.value === "true" });

									if (e.target.value == "true") {
										setAttribute({
											...attribute,
											requires_additional_value: e.target.value === "true",
											input_type: "number",
										});
									} else {
										setAttribute({
											...attribute,
											requires_additional_value: e.target.value === "true",
											input_type: "none",
										});
									}
								}}
							>
								<Option value="true">Yes</Option>
								<Option value="false">No</Option>
							</Select>
						</div> */}
						{attribute.requires_additional_value && (
							<div>
								<FieldTitleLabel notFirst>Additional Value Type</FieldTitleLabel>

								<Select value={attribute.input_type} onChange={(e) => setAttribute({ ...attribute, input_type: e.target.value })}>
									<Option value="number">Number</Option>
									<Option value="string">String</Option>
								</Select>
							</div>
						)}

						<LabelContainer first>
							<Label>Choices</Label>
						</LabelContainer>
						<div>
							<FieldTitleLabel notFirst> Name</FieldTitleLabel>
							<InputHolder type="text" onChange={(e) => setAttributeValue({ attribute_value: e.target.value })} value={attributeValue.attribute_value} />

							<ButtonTwo type="button" onClick={() => addValue(attributeValue)}>
								Add
							</ButtonTwo>
						</div>

						<div>
							{attribute.values.map((value, index) => (
								<AttrValue key={index}>
									<FieldTitleLabel notFirst>
										<FontAwesomeIcon icon={faTrash} onClick={() => deleteValue(index)} /> {value.attribute_value}
									</FieldTitleLabel>
								</AttrValue>
							))}
						</div>
					</FieldContainer>

					<ButtonsContainer>
						<CloseButton
							onClick={() => {
								fetchAttributes();
								onClose();
							}}
						>
							Close
						</CloseButton>
						<Button type="submit">Save</Button>
					</ButtonsContainer>
				</form>
			</PopupContent>
		</PopupOverlay>
	);
};

export default EditAttribute;
