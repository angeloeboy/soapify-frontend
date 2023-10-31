import {
  Button,
  Select,
  LabelContainer,
  Label,
  Option,
  FieldContainer,
  ProfilePictureContainer,
  FileInput,
  Centered,
  SecondaryButton,
  CloseButton,
  ButtonsContainer,
  PopupOverlay,
  PopupContent,
  HeaderTitle,
  FieldTitleLabel,
  InputHolder,
} from "@/styled-components/ItemActionModal";

import { useEffect, useState } from "react";

// import { getUser, editUser, getUserCategories } from "@/api/users";

const EditUser = ({ userId, onClose, GetUsers }) => {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    username: "",
    // Add other user information fields here
    password: "",
    confirmPassword: "",
    account_type: "",
    date_created: "",
  });
  const [categories, setCategories] = useState([]);

  //   useEffect(() => {
  //     fetchUserData();
  //     fetchUserCategories();
  //   }, []);

  //   const fetchUserData = async () => {
  //     try {
  //       const userData = await getUser(userId);
  //       setUser(userData.user); // Update the property name accordingly
  //       console.log(user);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   const fetchUserCategories = async () => {
  //     try {
  //       const categoryData = await getUserCategories();
  //       setCategories(categoryData.categories);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    // Append fields to formData for editing

    // editUser(formData, userId) // Update this function to edit user data
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .then(() => {
    //     GetUsers();
    //     onClose(); // Close the modal after editing
    //   });
  };

  return (
    <PopupOverlay>
      <PopupContent>
        <form onSubmit={(e) => editUser(e)} enctype="multipart/form-data">
          <HeaderTitle>
            Edit User: {user.first_name} {user.last_name}
          </HeaderTitle>
          <FieldContainer>
            <LabelContainer first>
              <Label>General Information</Label>{" "}
            </LabelContainer>
            <div>
              <FieldTitleLabel> First Name </FieldTitleLabel>
              <InputHolder
                type="text"
                placeholder="Edit First Name"
                onChange={(e) => {
                  setUser({ ...user, first_name: e.target.value });
                }}
                required
                value={user.first_name}
              />
            </div>
            <div>
              <FieldTitleLabel>Last Name</FieldTitleLabel>
              <InputHolder
                type="text"
                placeholder="Edit Last Name"
                onChange={(e) => {
                  setUser({ ...user, last_name: e.target.value });
                }}
                required
                value={user.last_name}
              />
            </div>
            <div>
              <FieldTitleLabel>Username</FieldTitleLabel>
              <InputHolder
                type="text"
                placeholder="Edit Username"
                onChange={(e) => {
                  setUser({ ...user, username: e.target.value });
                }}
                required
                value={user.username}
              />
            </div>
            <div>
              <FieldTitleLabel notFirst>Image (optional)</FieldTitleLabel>
              <ProfilePictureContainer>
                <Centered>
                  <input type="file" name="product_image" required />
                </Centered>
              </ProfilePictureContainer>
            </div>
            <div>
              <LabelContainer notfirst>
                <Label>Password</Label>{" "}
              </LabelContainer>
              <FieldTitleLabel>Change Password</FieldTitleLabel>
              <InputHolder
                type="password"
                placeholder="Set new Password"
                onChange={(e) => {
                  setUser({ ...user, password: e.target.value });
                }}
                required
                value={user.password}
              />
            </div>
            <div>
              <FieldTitleLabel>Confirm Password</FieldTitleLabel>
              <InputHolder
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => {
                  setUser({ ...user, confirmPassword: e.target.value });
                }}
                required
                value={user.confirmPassword}
              />
            </div>
            <div>
              <LabelContainer notfirst>
                <Label>Account Type</Label>{" "}
              </LabelContainer>
              <FieldTitleLabel>Type</FieldTitleLabel>
              <Select
                value={user.account_type}
                onChange={(e) => {
                  setUser({ ...user, account_type: e.target.value });
                }}
              >
                {categories.map((category) => (
                  <Option value={category.id} key={category.id}>
                    {category.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div>
              <LabelContainer notfirst>
                <Label>Miscellaneous</Label>{" "}
              </LabelContainer>
              <FieldTitleLabel>Date Created</FieldTitleLabel>
              <InputHolder
                type="date"
                onChange={(e) => {
                  setUser({ ...user, date_created: e.target.value });
                }}
                value={user.date_created}
              />
            </div>
          </FieldContainer>

          <ButtonsContainer>
            <CloseButton onClick={onClose}>Close</CloseButton>
            <Button type="submit">Save</Button>
          </ButtonsContainer>
        </form>
      </PopupContent>
    </PopupOverlay>
  );
};

export default EditUser;
