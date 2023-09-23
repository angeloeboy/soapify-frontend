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
	CloseButton,
	ButtonsContainer,
	PopupOverlay,
	PopupContent,
	HeaderTitle,
	FieldTitleLabel,
	InputHolder,
} from "@/styled-components/ItemActionModal";

import { useEffect, useState } from "react";
import { addCategory, addProduct, addTemplate, getProductCategories, getProducts } from "@/api/products";

const AddTemplateComponent = ({ onClose, onButtonClick, fetchCategories }) => {
	const [template, setTemplate] = useState({
		template_name: "",
		attributes: [],
	});

	const [attributeName, setAttributeName] = useState("");
	const [attributeChoices, setAttributeChoices] = useState([]);

	let AddTemplate = (e) => {
		e.preventDefault();

		addTemplate(template).then((res) => {
			console.log(res);
		});
	};

	return (
		<PopupOverlay>
			<PopupContent>
				<form onSubmit={(e) => AddCategory(e)} enctype="multipart/form-data">
					<FieldContainer>
						<HeaderTitle>Add Template</HeaderTitle>

						<LabelContainer first>
							<Label>General Information</Label>
						</LabelContainer>
						<div>
							<FieldTitleLabel> Template Name </FieldTitleLabel>
							<InputHolder
								type="text"
								onChange={(e) => {
									setTemplate({ ...template, template_name: e.target.value });
								}}
								required
								value={template.template_name}
							/>
						</div>

						<LabelContainer>
							<Label>Attributes</Label>
						</LabelContainer>

						<div>
							<FieldTitleLabel> Name </FieldTitleLabel>
							<InputHolder
								type="text"
								onChange={(e) => {
									setAttributeName(e.target.value);
								}}
								required
								value={attributeName}
							/>
							<FieldTitleLabel> Choices </FieldTitleLabel>
							<Button>Add</Button>
							<InputHolder
								type="text"
								onChange={(e) => {
									setTemplate({ ...template, template_name: e.target.value });
								}}
								required
								value={template.template_name}
							/>
							<Button>Save Attribute</Button>
						</div>
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

export default AddTemplateComponent;
