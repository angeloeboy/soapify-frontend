import { Button } from "@/components/misc/button";
import styled from "styled-components";

const DeactivateModalContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: white;
`;

const DeactivateModal = ({ text }) => {
	return (
		<div>
			{text}
			{/* <Button> Deactivate</Button> */}
		</div>
	);
};

export default DeactivateModal;
