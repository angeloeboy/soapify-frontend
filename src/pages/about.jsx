import NavBar from "@/components/misc/navbar";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

const PageContainer = styled.div`
	width: 100%;
	padding-top: 100px;
	img {
		width: 80%;
		max-width: 1000px;
		height: auto;
		margin: 0 auto;
		margin-top: 50px;
	}
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

	p {
		margin-top: 1rem;
	}
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
		<>
			<NavBar />
			<PageContainer>
				<AboutTitle>About Us</AboutTitle>

				<Image src="/about_bg.jpg" width={1920} height={1080} alt="about_img" />
				<AboutContainer>
					<AboutContent>
						<Column>
							<h2>Our Goals</h2>
							<p>We have several goals to enhance your shopping experience:</p>
							<ul>
								<p>
									<strong>Effortless Shopping</strong> - We strive to make the process of purchasing soap and cleaning essentials easy and convenient. Our
									user-friendly platform allows customers to browse, select, and order products effortlessly.
								</p>
								<p>
									<strong>Quality Assurance</strong> - Committed to excellence, we collaborate with well-known distributors to ensure that our customers receive
									only the finest soap and cleaning products, meeting the highest standards of quality.
								</p>
								<p>
									<strong>Innovation in Retail</strong> - By leveraging cutting-edge technology, we aim to redefine the retail landscape. Our focus extends
									beyond traditional transactions, encompassing efficient Point of Sale (POS) systems, streamlined inventory management, and insightful
									reporting.
								</p>
								<p>
									<strong>Customer Satisfaction</strong> - Your satisfaction is our priority. From the moment you explore our diverse product range to the
									completion of your purchase, we are dedicated to providing exceptional service and meeting your unique needs.
								</p>
							</ul>
						</Column>
					</AboutContent>
					<Column>
						<h2>Contact Us</h2>
						<p>Have questions or feedback? Reach out to us! We value your input and are here to assist you. Connect with us through email or phone.</p>
						<br />
						<p>
							<strong>Email: maantan.sammig@gmail.com</strong>
						</p>
						<p>
							<strong>Phone: 0932 103 0320</strong>
						</p>
					</Column>
				</AboutContainer>
			</PageContainer>
		</>
	);
};

export default AboutPage;
