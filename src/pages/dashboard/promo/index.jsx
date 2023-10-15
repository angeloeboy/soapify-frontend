import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/misc/dashboardLayout";
import PageTitle from "@/components/misc/pageTitle";
import Table, { ActionContainer, TableData, TableHeadings, TableRows } from "@/styled-components/TableComponent";
import StyledPanel from "@/styled-components/StyledPanel";
import { faEllipsis, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import AddPromoComponent from "@/components/promo/addOP";

import PromoSearchBar from "@/components/promo/searchBarAndFilter";
import AddPromoComponent from "@/components/promo/addPromo";

const PromoPage = () => {
	const [promotions, setPromotions] = useState([]);
	const [activeActionContainer, setActiveActionContainer] = useState(-1);
	const [isAddPopUpOpen, setIsAddPopUpOpen] = useState(false); // State to control the popup

	useEffect(() => {
		// Fetch promo data when the component mounts (can be replaced with API calls)
		const staticPromoData = [
			{
				promotionID: "P001",
				productName: "Product X",
				promotionName: "50% Off Sale",
				promotionType: "Discount",
				startDate: "2023-01-15",
				endDate: "2023-01-30",
				discountPercentage: 50,
				discountAmount: null,
				originalPrice: 100.0,
				promoPrice: 50.0,
				status: "Active",
				description: "Limited-time discount promotion.",
			},
			{
				promotionID: "P002",
				productName: "Product Y",
				promotionName: "Buy One Get One Free",
				promotionType: "BOGO",
				startDate: "2023-02-20",
				endDate: "2023-02-28",
				discountPercentage: null,
				discountAmount: null,
				originalPrice: 20.0,
				promoPrice: 20.0,
				status: "Active",
				description: "Special offer: Buy one, get one free!",
			},
			// Add more promo objects here as needed
		];

		setPromotions(staticPromoData);
	}, []);

	const getPromotionsFunc = () => {
		// Implement this function to fetch the latest promo data (e.g., from an API)
		// Update the 'promotions' state with the fetched data
	};

	return (
		<DashboardLayout>
			<PageTitle title="Promotions" />

			<StyledPanel>
				{/* Button to open the Add Promo popup */}
				<PromoSearchBar setIsAddPopUpOpen={setIsAddPopUpOpen} setPromotionsDisplay={setPromotions} />

				<Table>
					<tbody>
						<TableRows heading>
							<TableHeadings>Promotion ID</TableHeadings>
							<TableHeadings>Product Name</TableHeadings>
							<TableHeadings>Promotion Name</TableHeadings>
							<TableHeadings>Promotion Type</TableHeadings>
							<TableHeadings>Start Date</TableHeadings>
							<TableHeadings>End Date</TableHeadings>
							<TableHeadings>Discount Percentage</TableHeadings>
							<TableHeadings>Discount Amount</TableHeadings>
							<TableHeadings>Original Price</TableHeadings>
							<TableHeadings>Promotion Price</TableHeadings>
							<TableHeadings>Status</TableHeadings>
							<TableHeadings>Description</TableHeadings>
							<TableHeadings>Actions</TableHeadings>
						</TableRows>

						{promotions.map((promo, index) => (
							<TableRows key={promo.promotionID}>
								<TableData>{promo.promotionID}</TableData>
								<TableData>{promo.productName}</TableData>
								<TableData>{promo.promotionName}</TableData>
								<TableData>{promo.promotionType}</TableData>
								<TableData>{promo.startDate}</TableData>
								<TableData>{promo.endDate}</TableData>
								<TableData>{promo.discountPercentage}</TableData>
								<TableData>{promo.discountAmount}</TableData>
								<TableData>{promo.originalPrice}</TableData>
								<TableData>{promo.promoPrice}</TableData>
								<TableData>{promo.status}</TableData>
								<TableData>{promo.description}</TableData>
								<TableData>
									<FontAwesomeIcon
										className="ellipsis"
										icon={faEllipsis}
										onClick={() => (activeActionContainer === index ? setActiveActionContainer(-1) : setActiveActionContainer(index))}
									/>

									{activeActionContainer === index && (
										<ActionContainer onClick={() => setActiveActionContainer(-1)}>
											<p>
												<FontAwesomeIcon icon={faPen} />
												Edit
											</p>
											<p>
												<FontAwesomeIcon icon={faTrash} /> Delete
											</p>
										</ActionContainer>
									)}
								</TableData>
							</TableRows>
						))}
					</tbody>
				</Table>
			</StyledPanel>

			{isAddPopUpOpen && <AddPromoComponent setIsAddPopUpOpen={setIsAddPopUpOpen} getPromotionsFunc={getPromotionsFunc} />}
		</DashboardLayout>
	);
};

export default PromoPage;
