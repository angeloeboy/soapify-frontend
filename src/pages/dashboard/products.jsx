import TopBar from "@/components/topbar";
import { withAuth } from "./../../hoc/withAuth.hoc";
import DashboardLayout from "../../components/dashboardLayout";

import styled from "styled-components";
import Table from "@/components/table";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

const ProductsContainer = styled.div`
	width: 100%;
	border-radius: 14px;
	background: #fff;
	box-shadow: 0px 4px 4px 0px rgba(224, 224, 224, 0.25);
	margin-top: 28px;
	padding: 61px 40px;
`;

const Products = () => {
	return (
		<DashboardLayout>
			<TopBar pageName="Products" />

			<ProductsContainer>
				<Table>
					<tr className="tableHeadings">
						<th>Name</th>
						<th>ID</th>
						<th>Stock</th>
						<th>Status</th>
						<th>Actions</th>
					</tr>
					<tr>
						<td className="imgContainer">
							<Image src="/product_img.png" alt="My Image" width="40" height="40" /> Max Glow Yellow
						</td>
						<td>20ABCDHJ1200</td>
						<td>30</td>
						<td>LOW</td>
						<td>
							<FontAwesomeIcon icon={faPen} />
							<FontAwesomeIcon icon={faTrash} />
						</td>
					</tr>

					<tr>
						<td className="imgContainer">
							<Image src="/product_img.png" alt="My Image" width="40" height="40" /> Max Glow Yellow
						</td>
						<td>20ABCDHJ1200</td>
						<td>30</td>
						<td>LOW</td>
						<td>
							<FontAwesomeIcon icon={faPen} />
							<FontAwesomeIcon icon={faTrash} />
						</td>
					</tr>

					<tr>
						<td className="imgContainer">
							<Image src="/product_img.png" alt="My Image" width="40" height="40" /> Max Glow Yellow
						</td>
						<td>20ABCDHJ1200</td>
						<td>30</td>
						<td>LOW</td>
						<td>
							<FontAwesomeIcon icon={faPen} />
							<FontAwesomeIcon icon={faTrash} />
						</td>
					</tr>

					<tr>
						<td className="imgContainer">
							<Image src="/product_img.png" alt="My Image" width="40" height="40" /> Max Glow Yellow
						</td>
						<td>20ABCDHJ1200</td>
						<td>30</td>
						<td>LOW</td>
						<td>
							<FontAwesomeIcon icon={faPen} />
							<FontAwesomeIcon icon={faTrash} />
						</td>
					</tr>

					<tr>
						<td className="imgContainer">
							<Image src="/product_img.png" alt="My Image" width="40" height="40" /> Max Glow Yellow
						</td>
						<td>20ABCDHJ1200</td>
						<td>30</td>
						<td>LOW</td>

						<td>
							<FontAwesomeIcon icon={faPen} />
							<FontAwesomeIcon icon={faTrash} />
						</td>
					</tr>
				</Table>
			</ProductsContainer>
		</DashboardLayout>
	);
};

export default withAuth(Products);
