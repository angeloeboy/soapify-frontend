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
} from "@/components/styled-components/ItemActionModal";

import { useEffect, useState } from "react";
 

	return (
		<PopupOverlay>
			<PopupContent>
				<form onSubmit={(e) => AddProduct(e)} enctype="multipart/form-data">
					<HeaderTitle>Add Inventory</HeaderTitle>
					<FieldContainer>
						<LabelContainer first>
							<Label>General Information</Label>{" "}
						</LabelContainer>
						<div>
							<FieldTitleLabel> Product  </FieldTitleLabel>
							<InputHolder
								type="text"
								placeholder="Enter your Product Name"
							/>
						</div>
						<div>
							<FieldTitleLabel notFirst>Price</FieldTitleLabel>
							<InputHolder
								type="number"
								placeholder="Enter your Price"
							/>
						</div>
						<div>
							<FieldTitleLabel notFirst>Minimum Stock</FieldTitleLabel>
							<InputHolder type="text" placeholder="Enter your minimum stock" />
						</div>
						<div>
							<FieldTitleLabel notFirst>Image (optional)</FieldTitleLabel>
							<ProfilePictureContainer>
								<Centered>
									{/* <SecondaryButton onClick={onButtonClick}>
										{fileUploaded ? "You've uploaded a file" : "Click to Upload or Drag and drop an Image"}
									</SecondaryButton> */}
									{/* <FileInput ref={fileInput} onChange={handleFileUpload} /> */}
									<input type="file" name="product_image" required />
								</Centered>
							</ProfilePictureContainer>
						</div>

						<LabelContainer>
							<Label>Product Category</Label>
						</LabelContainer>
						<div>
							<FieldTitleLabel notFirst>Category</FieldTitleLabel>
							<Select>
								<Option value="Dishwashing Liquid">Dishwashing Liquid</Option>
								<Option value="Soap">Soap</Option>
								<Option value="General Items">General Items</Option>
							</Select>
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
;

export default AddInventoryComponent;
