import TopBar from "@/components/topbar";
import DashboardLayout from "@/components/dashboardLayout";

import Table from "@/components/styled-components/table";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import PageTitle from "@/components/pageTitle";
import TableControlPanel from "@/components/styled-components/TableControlPanel";
import StyledPanel from "@/components/styled-components/StyledPanel";
import { useEffect, useState } from "react";
import { getProducts } from "@/api/products";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Products = () => {
	const [products, setProducts] = useState([]);
	const router = useRouter();

	useEffect(() => {
		getProducts().then((res) => {
			console.log(res);
			setProducts(res.products);
		});
	}, []);

	let navigateToProduct = (id) => {
		router.push(`/dashboard/products/${id}`);
	};

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
							<th>Price</th>
							<th>Status</th>
						</tr>

						{products.length === 0
							? Array.from({ length: 8 }, (_, index) => (
									<tr key={index}>
										<td className="imgContainer">
											<Skeleton circle={true} height={40} width={40} />
											<Skeleton width={100} height={20} />
										</td>
										<td>
											<Skeleton width={50} height={20} />
										</td>
										<td>
											<Skeleton width={50} height={20} />
										</td>
										<td>
											<Skeleton width={50} height={20} />
										</td>
										<td>
											<Skeleton width={50} height={20} />
										</td>
									</tr>
							  ))
							: products.map((product) => (
									<tr key={product.product_id} onClick={() => navigateToProduct(product.product_id)}>
										<td className="imgContainer">
											<Image src="/product_img.png" alt="My Image" width="40" height="40" /> {product.product_name}
										</td>
										<td>{product.product_id}</td>
										<td>{product.quantity_in_stock}</td>
										<td>{product.product_price}</td>
										<td>LOW</td>
									</tr>
							  ))}
					</tbody>
				</Table>
			</StyledPanel>
		</DashboardLayout>
	);
};

export default Products;
