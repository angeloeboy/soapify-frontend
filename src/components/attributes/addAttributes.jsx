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
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { addAttribute } from "@/api/attributes"; // Import your API functions for attributes

const AddAttributeComponent = ({ setPopUpOpen, fetchAttributes }) => {
	const [attribute, setAttribute] = useState({
		attribute_name: "",
		requires_additional_value: false,
		input_type: "none",
		values: [],
		// Add more fields related to attributes here
	});

	const [attributeValues, setAttributeValues] = useState([]);
	const [attributeValue, setAttributeValue] = useState("");
	useEffect(() => {
		// if (!attribute.requires_additional_value) {
		// 	setAttribute({ ...attribute, input_type: "none" });
		// }
		// console.log(attribute)
		console.log(attribute);
	}, [attribute]);

	const addAttributeFunc = async (e) => {
		e.preventDefault();

		if (attribute.attribute_name == "") return;

		await addAttribute(attribute).then((res) => {
			console.log(res);
			fetchAttributes();
		});
	};

	const addValue = (value) => {
		let values = attribute.values;

		if (value == "") return;

		if (values.includes(value)) return;

		values.push(value);
		setAttribute({ ...attribute, values: values });
		setAttributeValue("");
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
				<form>
					<HeaderTitle>Add Attribute</HeaderTitle>
					<FieldContainer>
						<LabelContainer first>
							<Label>Attribute Information</Label>{" "}
						</LabelContainer>
						<div>
							<FieldTitleLabel notFirst>Attribute Name</FieldTitleLabel>
							<InputHolder type="text" onChange={(e) => setAttribute({ ...attribute, attribute_name: e.target.value })} value={attribute.attribute_name} />
						</div>
						<div>
							<FieldTitleLabel notFirst>Requires Additional Value</FieldTitleLabel>
							<Select
								value={attribute.requires_additional_value}
								onChange={(e) => {
									// setAttribute({ ...attribute, requires_additional_value: e.target.value === "true" });

									if (e.target.value == "true") {
										setAttribute({ ...attribute, requires_additional_value: e.target.value === "true", input_type: "number" });
									} else {
										setAttribute({ ...attribute, requires_additional_value: e.target.value === "true", input_type: "none" });
									}
								}}
							>
								<Option value="true">Yes</Option>
								<Option value="false">No</Option>
							</Select>
						</div>
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
							<InputHolder type="text" onChange={(e) => setAttributeValue(e.target.value)} value={attributeValue} />

							<Button type="button" onClick={() => addValue(attributeValue)}>
								Add
							</Button>
						</div>

						<div>
							{attribute.values.map((value, index) => (
								<div key={index}>
									<FieldTitleLabel notFirst>
										<FontAwesomeIcon icon={faTrash} onClick={() => deleteValue(index)} /> {value}
									</FieldTitleLabel>
								</div>
							))}
						</div>
					</FieldContainer>

					<ButtonsContainer>
						<CloseButton onClick={() => setPopUpOpen(false)}>Close</CloseButton>
						<Button onClick={(e) => addAttributeFunc(e)}>Save</Button>
					</ButtonsContainer>
				</form>
			</PopupContent>
		</PopupOverlay>
	);
};

export default AddAttributeComponent;
