import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/misc/dashboardLayout";
import PageTitle from "@/components/misc/pageTitle";
import PdfExporter from "@/components/misc/pdfExporter";
import Table, { ActionContainer, TableContainer, TableData, TableHeadings, TableRows } from "@/styled-components/TableComponent";
import StyledPanel from "@/styled-components/StyledPanel";
import { faEllipsis, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import AddPromo from "@/components/promo/addOP";

import PromoSearchBar from "@/components/promo/promoSearchBar";
import AddPromo from "@/components/promo/addPromo";
import { activatePromo, deactivatePromo, getPromos } from "@/api/promos";
import { getProducts } from "@/api/products";
import Pagination from "@/components/misc/pagination";
import EditPromo from "@/components/promo/editPromo";
import DeactivateModal from "@/components/misc/deactivate";
import { toast } from "react-toastify";
import ReactivateModal from "@/components/misc/reactivate";

const PromoPage = () => {
	const [promotions, setPromotions] = useState([]);
	const [promotionsDisplay, setPromotionsDisplay] = useState([]);
	const [activeActionContainer, setActiveActionContainer] = useState(-1);
	const [isAddPopUpOpen, setIsAddPopUpOpen] = useState(false); // State to control the popup
	const [isEditPopUpOpen, setIsEditPopUpOpen] = useState(false); // State to control the popup
	const [showDeactivatePopUp, setShowDeactivatePopUp] = useState(false); // State to control the popup\
	const [showActivatePopUp, setShowActivatePopUp] = useState(false); // State to control the popup\
	const [clickedName, setClickedName] = useState("");

	const [selectedPromo, setSelectedPromo] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = currentPage * itemsPerPage;
	const paginatedPromotions = promotionsDisplay.slice(startIndex, endIndex);

	useEffect(() => {
		getPromotionsFunc();
	}, []);

	const getPromotionsFunc = async () => {
		setIsLoading(true);
		const res = await getPromos();

		if (!res) {
			setIsLoading(false);
			return;
		}

		if (res.status === "Success") {
			console.log(res.data);
			setPromotions(res.data);
			setPromotionsDisplay(res.data);
		}

		setIsLoading(false);
	};

	const convertToDateFormat = (date) => {
		let newDate = new Date(date);
		let formattedDate = newDate.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
		return formattedDate;
	};

	const deactivatePromoFunc = async (promoID) => {
		const res = await deactivatePromo(promoID);

		if (!res) {
			return;
		}

		if (res.status === "Success") {
			getPromotionsFunc();
			// setShowDeactivatePopUp(false);
			toast.success("Promo deactivated");
		}
	};

	const activatePromoFunc = async (promoID) => {
		const res = await activatePromo(promoID);

		if (!res) {
			return;
		}

		if (res.status === "Success") {
			getPromotionsFunc();
			// setShowDeactivatePopUp(false);
			toast.success("Promo activated");
		}
	};

	return (
		<DashboardLayout>
			<PageTitle title="Promotions" />

			<StyledPanel>
				{/* Button to open the Add Promo popup */}
				<PromoSearchBar
					setIsAddPopUpOpen={setIsAddPopUpOpen}
					setPromotionsDisplay={setPromotionsDisplay}
					promotions={promotions}
					setCurrentPage={setCurrentPage}
				/>
				<TableContainer>
					<Table id="promos-table">
						<tbody>
							<TableRows $heading>
								<TableHeadings>Promotion Code</TableHeadings>
								<TableHeadings>Type</TableHeadings>
								<TableHeadings>Value</TableHeadings>
								<TableHeadings>Max use</TableHeadings>
								<TableHeadings>Current usage</TableHeadings>
								<TableHeadings>Expiry</TableHeadings>
								<TableHeadings>Actions</TableHeadings>
							</TableRows>
							{paginatedPromotions.map((promo, index) => (
								<TableRows key={promo.promotionID}>
									<TableData>{promo.promo_code}</TableData>
									<TableData>{promo.promo_code_type}</TableData>
									<TableData>
										{promo.promo_code_value} {promo.promo_code_type == "PERCENTAGE" ? "%" : "PHP"}
									</TableData>
									<TableData>{promo.promo_code_max_use !== null ? promo.promo_code_max_use : "Unlimited"}</TableData>
									<TableData>{promo.promo_code_current_use}</TableData>

									<TableData>{convertToDateFormat(promo.promo_code_expiry)}</TableData>
									<TableData>
										<FontAwesomeIcon
											className="ellipsis"
											icon={faEllipsis}
											onClick={() => (activeActionContainer === index ? setActiveActionContainer(-1) : setActiveActionContainer(index))}
										/>

										{activeActionContainer === index && (
											<ActionContainer onClick={() => setActiveActionContainer(-1)}>
												<p
													onClick={() => {
														setSelectedPromo(promo);
														setIsEditPopUpOpen(true);
													}}
												>
													<FontAwesomeIcon icon={faPen} />
													Edit
												</p>
												<p>
													<FontAwesomeIcon icon={faTrash} /> Delete
												</p>

												{promo.isActive ? (
													<p
														onClick={() => {
															setSelectedPromo(promo);
															setShowDeactivatePopUp(true);
															setClickedName(promo.promo_code);
														}}
													>
														<FontAwesomeIcon icon={faTrash} /> Deactivate
													</p>
												) : (
													<p
														onClick={() => {
															setSelectedPromo(promo);
															setShowActivatePopUp(true);
															setClickedName(promo.promo_code);
														}}
													>
														<FontAwesomeIcon icon={faTrash} /> Activate
													</p>
												)}
											</ActionContainer>
										)}
									</TableData>
								</TableRows>
							))}
						</tbody>
					</Table>
				</TableContainer>

				<PdfExporter tableId="promos-table" fileName="promos.pdf" />
				<Pagination
					setItemsPerPage={setItemsPerPage}
					totalItems={promotionsDisplay.length}
					itemsPerPage={itemsPerPage} //   this is correct
					currentPage={currentPage}
					onPageChange={setCurrentPage}
				/>
			</StyledPanel>

			{isAddPopUpOpen && <AddPromo setIsAddPopUpOpen={setIsAddPopUpOpen} getPromotionsFunc={getPromotionsFunc} />}
			{isEditPopUpOpen && <EditPromo setIsEditPopUpOpen={setIsEditPopUpOpen} getPromotionsFunc={getPromotionsFunc} selectedPromo={selectedPromo} />}
			{showDeactivatePopUp && (
				<DeactivateModal type="Promo" text={clickedName} close={setShowDeactivatePopUp} confirm={() => deactivatePromoFunc(selectedPromo.promo_code_id)} />
			)}

			{showActivatePopUp && (
				<ReactivateModal type="Promo" text={clickedName} close={setShowActivatePopUp} confirm={() => activatePromoFunc(selectedPromo.promo_code_id)} />
			)}
		</DashboardLayout>
	);
};

export default PromoPage;
