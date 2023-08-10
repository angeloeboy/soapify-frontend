import DashboardLayout from "@/components/misc/dashboardLayout";
import PageTitle from "@/components/misc/pageTitle";
import Table, { ActionContainer, Status, TableData, TableHeadings, TableRows } from "@/styled-components/TableComponent";
import StyledPanel from "@/styled-components/StyledPanel";
import { faEllipsis, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState, useEffect } from "react";

const NewTablePage = () => {
	const [products, setProducts] = useState([
		{
			name: "Yellow Soap Ind..",
			category: "Individual",
			price: "45.00",
			stock: "23",
			Status: "Low",
		},
		{
			name: "Blue Soap box",
			category: "BOX",
			price: "45.00",
			stock: "23",
			Status: "Low",
		},
		{
			name: "Blue Soap box",
			category: "BOX",
			price: "45.00",
			stock: "23",
			Status: "Low",
		},
	]);

	const [activeActionContainer, setActiveActionContainer] = useState(-1);

	const handleClickOutside = (event) => {
		if (!event.target.closest(".action-container") && !event.target.closest(".ellipsis")) {
			setActiveActionContainer(null);
		}
	};

	useEffect(() => {
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	return (
		<DashboardLayout>
			<PageTitle title="New Table Testing" />

			<StyledPanel>
				<Table>
					<tbody>
						<TableRows heading>
							<TableHeadings>Name</TableHeadings>
							<TableHeadings>Category</TableHeadings>
							<TableHeadings>Price</TableHeadings>
							<TableHeadings>Stock</TableHeadings>
							<TableHeadings>Status</TableHeadings>
							<TableHeadings>Actions</TableHeadings>
						</TableRows>
						{products.map((product, index) => {
							return (
								<TableRows key={index}>
									<TableData bold withImage>
										<Image src="/product_img2.png" width={40} height={40} alt={"Product image"} />
										{product.name}
									</TableData>
									<TableData>{product.category}</TableData>
									<TableData>{product.price}</TableData>
									<TableData>{product.stock}</TableData>
									<TableData>
										<Status bgColor={"rgba(255, 116, 116, 0.49)"} color={"#EA0000"}>
											{product.Status}
										</Status>
									</TableData>
									<TableData>
										<FontAwesomeIcon
											className="ellipsis"
											icon={faEllipsis}
											onClick={() => (activeActionContainer === index ? setActiveActionContainer(-1) : setActiveActionContainer(index))}
										/>

										{activeActionContainer === index && (
											<ActionContainer onClick={() => setActiveActionContainer(-1)}>
												<p>
													{" "}
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
							);
						})}
					</tbody>
				</Table>
			</StyledPanel>
		</DashboardLayout>
	);
};

export default NewTablePage;
