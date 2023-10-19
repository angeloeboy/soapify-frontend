import { TableData, TableRows } from "@/styled-components/TableComponent";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingSkeleton = ({ columns }) => {
	return (
		<>
			{Array.from({ length: 8 }, (_, index) => (
				<TableRows key={index}>
					<TableData className="imgContainer">
						<Skeleton circle={true} height={40} width={40} />
						{/* <Skeleton width={100} height={20} /> */}
					</TableData>
					{[...Array(columns)].map((_, idx) => (
						<TableData key={idx}>
							<Skeleton width={50} height={20} />
						</TableData>
					))}
				</TableRows>
			))}
		</>
	);
};

export default LoadingSkeleton;
