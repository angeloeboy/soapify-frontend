import TopBar from "@/components/topbar";
import DashboardLayout from "@/components/dashboardLayout";

import styled from "styled-components";
import Table from "@/components/styled-components/table";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/button";
import PageTitle from "@/components/pageTitle";
import TableControlPanel from "@/components/styled-components/TableControlPanel";
import StyledPanel from "@/components/styled-components/StyledPanel";

const Products = () => {
	return (
		<DashboardLayout>
			<PageTitle title="Products" />

			<StyledPanel>
				<TableControlPanel>
					<div className="searchBar">
						<p>Search for Product</p>
						<input type="text" placeholder="Search" />
					</div>
				</TableControlPanel>
				<Table>
					<tbody>
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
					</tbody>
				</Table>

				{/* <Button width="233px" className="addProductBtn">
					Add Product
				</Button> */}
			</StyledPanel>
		</DashboardLayout>
	);
};

export default Products;
