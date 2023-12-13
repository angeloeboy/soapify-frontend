import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  width: 100%;
  padding-left: 56px;
`;

const AboutContainer = styled.div`
  padding: 55px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const AboutTitle = styled.h1`
  margin-top: 20px;
  text-align: center;
`;

const MissionSection = styled.div`
  background-color: #0056b3;
  color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  width: 70%;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }

  h2 {
    font-size: 20px;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
    color: white;
    font-weight: 300;
  }
`;

const MissionTitle = styled.h2`
  font-size: 32px;
  margin-bottom: 10px;
  color: white;
`;

const AboutContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
  justify-content: center;
`;

const Column = styled.div`
  width: 50%;
  box-sizing: border-box;
`;

const GoalCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  width: 100%;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  h2 {
    font-size: 20px;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
  }
`;

const AboutPage = () => {
  return (
    <PageContainer>
      <AboutTitle>About Us</AboutTitle>
      <AboutContainer>
        <MissionSection>
          <MissionTitle>Our Mission</MissionTitle>
          <p >
            <br />
            At smsabon.com, our mission is to provide customers with a hassle-free and enjoyable shopping experience,<br /> offering a diverse selection of high-quality soap and cleaning products from reputable brands.
          </p>
        </MissionSection>
        <AboutContent>
          <Column>
            <h2>Meet the </h2>
            <p>
              Welcome to smsabon.com, where innovation meets efficiency. Meet the visionary minds behind SM Sabon—dedicated individuals who have entrusted the development and management of the website to our skilled team.
            </p>
            <ul style={{ paddingLeft: '40px' }}>
              <li><strong>Key Contributor - Rommel V. Tan</strong></li>
              <li><strong>Finance Manager - Maan B. Tan</strong></li>
            </ul>
          </Column>
          <Column>
            <GoalCard>
              <h2>Our Goals</h2>
              <p>
                We have several goals to enhance your shopping experience:
              </p>
              <ul style={{ paddingLeft: '40px' }}>
                <li><strong>Effortless Shopping</strong> - We strive to make the process of purchasing soap and cleaning essentials easy and convenient. Our user-friendly platform allows customers to browse, select, and order products effortlessly.</li>
                <li><strong>Quality Assurance</strong> - Committed to excellence, we collaborate with well-known distributors to ensure that our customers receive only the finest soap and cleaning products, meeting the highest standards of quality.</li>
                <li><strong>Innovation in Retail</strong> - By leveraging cutting-edge technology, we aim to redefine the retail landscape. Our focus extends beyond traditional transactions, encompassing efficient Point of Sale (POS) systems, streamlined inventory management, and insightful reporting.</li>
                <li><strong>Customer Satisfaction</strong> - Your satisfaction is our priority. From the moment you explore our diverse product range to the completion of your purchase, we are dedicated to providing exceptional service and meeting your unique needs.</li>
              </ul>
            </GoalCard>
          </Column>
        </AboutContent>
        <Column>
          <h2>Contact Us</h2>
          <p>
            Have questions or feedback? Reach out to us! We value your input and are here to assist you. Connect with us through email or phone.
          </p>
          <br />
          <p><strong>Email: maantan.sammig@gmail.com</strong></p>
          <p><strong>Phone: 0932 103 0320</strong></p>
        </Column>
      </AboutContainer>
    </PageContainer>
  );
};

export default AboutPage;