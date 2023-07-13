import { styled } from "styled-components";

let HomeContainer = styled.div`
	h1 {
		background-color: pink;
	}
`;

const Home = () => {
	return (
		<HomeContainer>
			<h1>Testing this is home</h1>;
		
		</HomeContainer>
	);
};

export default Home;
