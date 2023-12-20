const { default: Link } = require("next/link");
const { default: styled } = require("styled-components");

const NavBarContainer = styled.div`
	.limiter {
		justify-content: space-between;
		align-items: center;
		/* max-width: 1600px; */
		margin: 0 auto;
		padding: 20px 5%;
	}

	nav {
		transition: all 0.3s ease-in-out;
		z-index: 9;
		position: fixed;
		width: 100%;
		z-index: 99;
		padding: 0px;
		background-color: #f5f7f8;
		@media (max-width: 800px) {
			padding: 0px 0px;
		}
		.limiter {
			display: flex;

			#burger {
				display: none;
				z-index: 999;
			}

			.logo {
				position: relative;
				img {
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					width: 70px;
				}

				p {
					font-size: 25px;
				}
			}

			.navlinks {
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				align-items: center;
				width: auto;
				position: relative;
				top: auto;
				right: auto;
				height: auto;
				transform: translateX(0%);
				overflow-y: visible;
				padding: 0;

				.navitems {
					list-style-type: none;
					padding-left: 3rem;
					a {
						text-decoration: none;
						color: black;
						/* font-size: 14px; */
					}

					.button {
						padding: 10px 15px;
						background-image: url("../images/gradient.png");
						background-position: center;
						// background-size: cover;
						color: black;
						font-weight: bold;
					}
				}
			}

			.button {
				a {
					font-size: 14px !important;
					background-color: #0ec76f;
					color: black !important;
					padding: 10px 16px;
					font-weight: bold;
				}
			}

			.active {
				transform: translateX(0%) !important;
			}

			@media (max-width: 800px) {
				#burger {
					display: block;

					.burgerlines {
						background-color: #002056;

						height: 3px;
						width: 40px;
						margin: 6px 0px;
					}
				}
				.navlinks {
					width: 60vw;
					position: absolute;
					top: 0;
					right: 0;
					height: 100vh;
					transform: translateX(100%);
					transition: 0.3s ease-in-out;
					overflow-y: none;
					background-color: #f5f7f8;

					flex-flow: column;
					justify-content: center;
					align-items: flex-start;
					font-size: 1rem;
					li {
						margin: 10px 0px;
					}
				}
			}
		}
	}

	.scrolled {
		background-color: #111722;
	}
`;

const NavBar = () => {
	const handleBurgerClick = () => {
		const burger = document.getElementById("burger");
		const links = document.getElementById("links");
		links.classList.toggle("active");
		burger.classList.toggle("toggle");
	};

	return (
		<NavBarContainer>
			<nav className="navbar">
				<div className="limiter">
					<div className="logo">
						<img src="assets/images/logo.png" alt="" />
					</div>
					<ul className="navlinks" id="links">
						<li className="navitems">
							<Link href="/login" className="itemlinks">
								Login
							</Link>
						</li>
						<li className="navitems">
							<Link href="/register" className="itemlinks">
								Register
							</Link>
						</li>
						<li className="navitems">
							<Link href="/about" className="itemlinks">
								About
							</Link>
						</li>
						<li className="navitems">
							<Link href="/announcements" className="itemlinks">
								Announcements
							</Link>
						</li>
					</ul>
					<div
						id="burger"
						onClick={() => {
							handleBurgerClick();
						}}
					>
						<div className="burgerlines"></div>
						<div className="burgerlines"></div>
						<div className="burgerlines"></div>
					</div>
				</div>
			</nav>
		</NavBarContainer>
	);
};

export default NavBar;
