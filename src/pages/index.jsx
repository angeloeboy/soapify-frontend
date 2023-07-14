import { styled } from "styled-components";

let HomeContainer = styled.div`
	h1 {
		background-color: pink;
	}
`;

const Home = () => {
	return (
		<HomeContainer>
			<h1>this is not Home</h1>;
		
		</HomeContainer>
	);
};

export default Home;
