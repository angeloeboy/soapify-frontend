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
} from "@/styled-components/ItemActionModal";

import { useEffect, useState } from "react";
//import { addPromo } from "@/api/promos"; // Adjust the API import based on your requirements

const AddPromoComponent = ({ setIsAddPopUpOpen, getPromosFunc }) => {
	const currentDate = new Date().toISOString();

	const [promo, setPromo] = useState({
		promoID: "",
		productName: "",
		promoName: "",
		promoType: "",
		startDate: currentDate,
		endDate: currentDate,
		discountPercentage: 0,
		discountAmount: 0,
		originalPrice: 0,
		promoPrice: 0,
		status: "",
		description: "",
		// Add any other promo-related fields you need
	});

	const addPromoFunc = async (e) => {
		e.preventDefault();
		await addPromo(promo).then((res) => {
			console.log(res);
		});

		await getPromosFunc();
	};

	return (
		<PopupOverlay>
			<PopupContent>
				<form onSubmit={(e) => addPromoFunc(e)}>
					<HeaderTitle>Add Promotion</HeaderTitle>
					<FieldContainer>
						<LabelContainer first>
							<Label>General Information</Label>
						</LabelContainer>
						<div>
							<FieldTitleLabel>Promotion ID</FieldTitleLabel>
							<InputHolder type="text" placeholder="Enter promotion ID" onChange={(e) => setPromo({ ...promo, promoID: e.target.value })} />
						</div>
						<div>
							<FieldTitleLabel>Product Name</FieldTitleLabel>
							<InputHolder type="text" placeholder="Enter product name" onChange={(e) => setPromo({ ...promo, productName: e.target.value })} />
						</div>
						<div>
							<FieldTitleLabel>Promotion Name</FieldTitleLabel>
							<InputHolder type="text" placeholder="Enter promotion name" onChange={(e) => setPromo({ ...promo, promoName: e.target.value })} />
						</div>
						<div>
							<FieldTitleLabel>Promotion Type</FieldTitleLabel>
							<InputHolder type="text" placeholder="Enter promotion type" onChange={(e) => setPromo({ ...promo, promoType: e.target.value })} />
						</div>
						<div>
							<FieldTitleLabel>Start Date</FieldTitleLabel>
							<InputHolder type="date" placeholder="Enter start date" onChange={(e) => setPromo({ ...promo, startDate: e.target.value })} />
						</div>
						<div>
							<FieldTitleLabel>End Date</FieldTitleLabel>
							<InputHolder type="date" placeholder="Enter end date" onChange={(e) => setPromo({ ...promo, endDate: e.target.value })} />
						</div>
						{/* Add fields for other promo-related information */}
					</FieldContainer>
					<ButtonsContainer>
						<CloseButton onClick={() => setIsAddPopUpOpen(false)}>Close</CloseButton>
						<Button type="submit">Save</Button>
					</ButtonsContainer>
				</form>
			</PopupContent>
		</PopupOverlay>
	);
};

export default AddPromoComponent;
