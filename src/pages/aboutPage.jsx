import React from 'react';
import styled from 'styled-components';
import DashboardLayout from '@/components/misc/dashboardLayout';
import PageTitle from '@/components/misc/pageTitle';


const AboutContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
  box-sizing: border-box;
  
`;

const LeftColumn = styled.div`
  width: 50%;
  box-sizing: border-box;
 
  
`;

const RightColumn = styled.div`
  width: 50%;
  box-sizing: border-box;
  
`;
const MissionCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  height: 100%;
  width: 850px;
  margin-bottom: 20px;
 
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;
const TeamCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  height: 100%;
  width: 100%;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const GoalsContainer = styled.div`
  width: 50%;
  box-sizing: border-box;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const GoalCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  margin-right: 5px;
  width: calc(50% - 10px); 
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const ContactCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 100%;
  height: 500px;
  margin-top: 20px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;
const AboutPage = () => {
  return (
    <DashboardLayout>
        <PageTitle title=" About Us"  />
      <AboutContainer>
        <LeftColumn>
        <MissionCard>
          <h2>Our Mission</h2>
          <p>
            <br></br>
            At smsabon.com, our mission is to provide customers with a hassle-free and enjoyable shopping experience, offering a diverse selection of high-quality soap and cleaning products sourced from reputable distributors. Among them is our esteemed partner, SM Sabon.
          </p>
        </MissionCard>
        </LeftColumn>
        <RightColumn>
        <TeamCard>
          <h2>Meet the Team</h2>
          <p>
            Welcome to smsabon.com, where innovation meets efficiency. Meet the minds behind the scenes—four dedicated individuals committed to revolutionizing the retail experience for SM Sabon:
          </p>
          <ul style={{ paddingLeft: '40px' }}>
             
              <li>Angelo R. Zuñiga</li>
              <li>Rameses A. Tan</li>
              <li>Jan Nicolas B. Ortega</li>
              <li>Marc Dranreb A. Villaflores</li>
            </ul>
        </TeamCard>
        </RightColumn>
        
        

        
        <GoalsContainer>
          <GoalCard>
            <h2>Effortless Shopping</h2>
            <p>
              We strive to make the process of purchasing soap and cleaning essentials easy and convenient. Our user-friendly platform allows customers to browse, select, and order products effortlessly.
            </p>
          </GoalCard>

          <GoalCard>
            <h2>Quality Assurance</h2>
            <p>
              Committed to excellence, we collaborate with well-known distributors to ensure that our customers receive only the finest soap and cleaning products, meeting the highest standards of quality.
            </p>
          </GoalCard>

          <GoalCard>
            <h2>Innovation in Retail</h2>
            <p>
              By leveraging cutting-edge technology, we aim to redefine the retail landscape. Our focus extends beyond traditional transactions, encompassing efficient Point of Sale (POS) systems, streamlined inventory management, and insightful reporting.
            </p>
          </GoalCard>

          <GoalCard>
            <h2>Customer Satisfaction</h2>
            <p>
              Your satisfaction is our priority. From the moment you explore our diverse product range to the completion of your purchase, we are dedicated to providing exceptional service and meeting your unique needs.
            </p>
          </GoalCard>
        </GoalsContainer>
        <RightColumn>
        <ContactCard>
          <h2>Contact Us</h2>
          <p>
            Have questions or feedback? Reach out to us! We value your input and are here to assist you. Connect with us through email or phone.
          </p>
          <p>Email: info@smsabon.com</p>
          <p>Phone: (123) 456-7890</p>
        </ContactCard>
        </RightColumn>
      </AboutContainer>
    </DashboardLayout>
  );
};

export default AboutPage;