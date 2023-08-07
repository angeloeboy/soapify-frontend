import { useState } from 'react';
import { useRouter } from 'next/router';
import StyledPanel, { BigTitle, FieldTitle } from "@/components/styled-components/StyledPanel";
import { styled } from "styled-components";
import Sidebar from "@/components/sidebar";
import DashboardLayout from "@/components/dashboardLayout";

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  background-color: transparent; /* Make the background transparent */
  margin-bottom: 20px; /* Add margin-bottom to create a gap between SearchBar and CategoriesButton */
`;

const SearchIcon = styled.img`
  position: absolute;
  top: 50%;
  left: 20px; /* Adjust the left position as needed */
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const SearchBar = styled.input`
  width: 592px;
  padding: 10px 30px 10px 50px; /* Add padding on both sides for the icon */
  border: 1px solid #DDDD;
  border-radius: 4px;
  font-size: 14px;
  border-radius: 12px;
`;

const CategoriesButton = styled.button`
  color: black;
  background-color: transparent; /* Make the background transparent */
  border: 1px solid #DDDD; /* Add a border around the button */
  font-size: 6px;
  cursor: pointer;
  padding: 8px 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 12px;
  margin-left: 16px;
  min-width: 108px;
`;

const FilterIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const AllText = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const HomeContainer = styled.div``;

const ImageLabelContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #DDDD;
  flex-direction: column;
  border-radius: 18px;
  padding: 25px;
  @media (max-width: 768px) {
  }
`;

const Image = styled.img`
  width: 100px;
  height: 171px;
  margin-right: 16px;
  object-fit: cover;
  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
    margin-right: 8px;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* Add this property to create space between the two elements */
  width: 100%;
  padding: 0 16px;
  flex: 1;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center; /* Adjust as per your design needs */
    padding: 10px 16px;
  }
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  color: #005EFF;

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 250px); /* Adjust the width as per your requirement */
  gap: 15px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 150px); /* Adjust the width as per your requirement */
    gap: 10px;
  }
`;

const Button = styled.button`
  /* Button styles here */
  color: white;
  background-color: #002056;
  border-radius: 4px;
  padding: 10px 20px;
  border: none;
  margin: 5px;
  font-size: 16px;
  cursor: pointer;
  width: 221px;
  height: 50px;
  margin-top: 25px; /* Add margin-top to create spacing between Button and other elements */

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const router = useRouter();

  return (
    <DashboardLayout>
      <BigTitle>POS</BigTitle>
      
      <StyledPanel>
        
        <FieldTitle>Search for Product</FieldTitle>  

        <SearchBarContainer>
          <SearchIcon src="search.png" alt="Search Icon" />
          <SearchBar
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <CategoriesButton onClick={() => router.push("/categories")}>
            <FilterIcon src="Filter.PNG" alt="Filter Icon" />
            <AllText>All</AllText>
          </CategoriesButton>
        </SearchBarContainer>

        <GridContainer>

        <ImageLabelContainer>
            <Image src="sabon.png" />
            <InfoContainer>
              <div>
                <FieldTitle>Max Glow Yellow BOX</FieldTitle>
                <FieldTitle>Stock: 90</FieldTitle>
              </div>
              <Label>P50.00</Label>
            </InfoContainer>
            <Button onClick={() => router.push("/dashboard")}>Add</Button>
          </ImageLabelContainer>

          <ImageLabelContainer>
            <Image src="sabon.png" />
            <InfoContainer>
              <div>
                <FieldTitle>Max Glow Yellow BOX</FieldTitle>
                <FieldTitle>Stock: 90</FieldTitle>
              </div>
              <Label>P50.00</Label>
            </InfoContainer>
            <Button onClick={() => router.push("/dashboard")}>Add</Button>
          </ImageLabelContainer>

          <ImageLabelContainer>
            <Image src="sabon.png" />
            <InfoContainer>
              <div>
                <FieldTitle>Max Glow Yellow BOX</FieldTitle>
                <FieldTitle>Stock: 90</FieldTitle>
              </div>
              <Label>P50.00</Label>
            </InfoContainer>
            <Button onClick={() => router.push("/dashboard")}>Add</Button>
          </ImageLabelContainer>

          <ImageLabelContainer>
            <Image src="sabon.png" />
            <InfoContainer>
              <div>
                <FieldTitle>Max Glow Yellow BOX</FieldTitle>
                <FieldTitle>Stock: 90</FieldTitle>
              </div>
              <Label>P50.00</Label>
            </InfoContainer>
            <Button onClick={() => router.push("/dashboard")}>Add</Button>
          </ImageLabelContainer>

          <ImageLabelContainer>
            <Image src="sabon.png" />
            <InfoContainer>
              <div>
                <FieldTitle>Max Glow Yellow BOX</FieldTitle>
                <FieldTitle>Stock: 90</FieldTitle>
              </div>
              <Label>P50.00</Label>
            </InfoContainer>
            <Button onClick={() => router.push("/dashboard")}>Add</Button>
          </ImageLabelContainer>

          <ImageLabelContainer>
            <Image src="sabon.png" />
            <InfoContainer>
              <div>
                <FieldTitle>Max Glow Yellow BOX</FieldTitle>
                <FieldTitle>Stock: 90</FieldTitle>
              </div>
              <Label>P50.00</Label>
            </InfoContainer>
            <Button onClick={() => router.push("/dashboard")}>Add</Button>
          </ImageLabelContainer>

          
          
        </GridContainer>
      </StyledPanel>
    </DashboardLayout>
  );
};

export default Home;