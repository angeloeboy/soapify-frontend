import PageTitle from "@/components/pageTitle";
import Table, { ActionList, Status, TableData, TableHead, TableRow } from "@/components/styled-components/NewTable";
import { faEllipsisH, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState, useEffect } from "react";

const { default: DashboardLayout } = require("@/components/dashboardLayout");
const { default: StyledPanel } = require("@/components/styled-components/StyledPanel");

const TestTable = () => {
	const [products, setProducts] = useState([
		{
			name: "Yellow Soap Ind..",
			id: "Individual",
			stock: "45.00",
			price: "34",
			status: "Low",
		},
		{
			name: "Yellow Soap Ind..",
			id: "Individual",
			stock: "45.00",
			price: "34",
			status: "Low",
		},
		{
			name: "Yellow Soap Ind..",
			id: "Individual",
			stock: "45.00",
			price: "34",
			status: "Low",
		},
		{
			name: "Yellow Soap Ind..",
			id: "Individual",
			stock: "45.00",
			price: "34",
			status: "Low",
		},
	]);

	const [selected, setSelected] = useState(-1);

	useEffect(() => {
		const clickHandler = () => setSelected(-1);

		document.addEventListener("click", clickHandler);
		return () => {
			document.removeEventListener("click", clickHandler);
		};
	}, []);

	return (
		<>
			<DashboardLayout>
				<PageTitle title="Test Table" />
				<StyledPanel>
					<Table>
						<tbody>
							<TableRow heading>
								<TableHead>Name</TableHead>
								<TableHead>ID</TableHead>
								<TableHead>Stock</TableHead>
								<TableHead>Price</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Actions</TableHead>
							</TableRow>
							{products.map((product, index) => {
								return (
									<TableRow key={index}>
										<TableData bold>
											{" "}
											<Image src="/product_img2.png" width={30} height={30} alt="Picture of the product" /> {product.name}{" "}
										</TableData>
										<TableData> {product.id} </TableData>
										<TableData> {product.stock} </TableData>
										<TableData> {product.price} </TableData>
										<TableData>
											<Status bgColor="rgba(255, 116, 116, 0.49)" textColor="#EA0000">
												{product.status}
											</Status>{" "}
										</TableData>
										<TableData>
											<FontAwesomeIcon
												icon={faEllipsisH}
												onClick={(e) => {
													e.stopPropagation();
													selected === index ? setSelected(-1) : setSelected(index);
												}}
											/>
											{selected === index && (
												<ActionList>
													<p>
														<FontAwesomeIcon icon={faPencil} /> Edit
													</p>
													<p>
														<FontAwesomeIcon icon={faTrash} /> Delete
													</p>
												</ActionList>
											)}
										</TableData>
									</TableRow>
								);
							})}
						</tbody>
					</Table>
				</StyledPanel>
			</DashboardLayout>
		</>
	);
};

export default TestTable;
