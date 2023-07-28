import React from "react";
import DashboardLayout from "@/components/dashboardLayout";
import PageTitle from "@/components/pageTitle";
import StyledPanel from "@/components/styled-components/StyledPanel";
import { useRouter } from "next/router";
import styled from "styled-components";

const Button = styled.button`
  /* Button styles here */
  color: white;
  background-color: #002056;
  border-radius: 4px;
  padding: 10px 20px;
  border: none;
  margin 5px;
  font-size: 16px;
  cursor: pointer;
  width: 20%; /* Adjust the width to 20% */
`;

const Label = styled.label`
  /* Label styles here */
  display: block;
  margin:5px;
  font-size: 14px;
  font-weight: bold;
`;

const TextField = styled.input`
  /* TextField styles here */
  width:100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Select = styled.select`
  /* Select styles here */
  width: 100%;
  padding: 10px;
  margin-bottom: 30px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Option = styled.option`
  /* Option styles here */
`;

const Container = styled.div`
  /* Container styles here */
  display: flex;
  justify-content:flex-start;
  height: 100%;
`;

const FieldContainer = styled.div`
  /* FieldContainer styles here */
  display: flex;
  width:20%;
  flex-direction: column;
  flex: 1;
`;
const ProfilePictureContainer = styled.div`
width: 50%;
     `;
  
    const FileInput = styled.input.attrs({ type: "file" })`
      /* File input styles here */
      margin-left: 10px; /* Add some margin between label and input file */
      display: flex;
      height:300px;
      align-items: center;
      justify-content: center;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 10px;
      background-color: #f9f9f9;
    `;
   
 
const Test = () => {
    const router = useRouter();
  
     
  
    return (
      <DashboardLayout>
        <PageTitle title="Add User" />
        <StyledPanel>
          <Container>
            <FieldContainer>
              <Label>First Name</Label>
              <TextField type="text" placeholder="Enter your first name" />
  
              <Label>Last Name</Label>
              <TextField type="text" placeholder="Enter your last name" />
  
              <Label>Username</Label>
              <TextField type="text" placeholder="Enter your username" />
  
              <Label>Password</Label>
              <TextField type="password" placeholder="Enter your password" />
  
              <Label>User Level</Label>
              <Select>
                <Option value="Store Clerk">Store Clerk</Option>
                <Option value="Store Owner">Store Owner</Option>
                <Option value="Cashier">Cashier</Option>
              </Select>
            </FieldContainer>
  
            <ProfilePictureContainer>
              <Label>Profile Picture</Label>
              <FileInput />
            </ProfilePictureContainer>
          </Container>
          <Button onClick={() => router.push("/dashboard")}>Create User</Button>
        </StyledPanel>
      </DashboardLayout>
    );
  };
  
  export default Test;
  