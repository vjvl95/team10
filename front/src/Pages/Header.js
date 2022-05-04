import styled from 'styled-components';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

import React, { useState, useEffect } from 'react';
import AuthModal from './User/AuthModal';
import Button from '../Components/Button';
import { userIdState, loginState } from './User/UserAtom';

const StyledHeaderContainer = styled(Container)`
	color: #ffffff;
	background-color: #075f3a;
	.nav-link {
		font-family: 'Elice Digital Baeum';
		color: #ffffff !important;
	}
`;

const Header = () => {
	const navigate = useNavigate();
	const [isLogin, setIsLogin] = useRecoilState(loginState);
	const [userId, setUserId] = useRecoilState(userIdState);

	const [showAuthModal, setShowAuthModal] = useState(false);

	const createLink = (url, title) => {
		return (
			<Nav.Link href={url} style={{ textDecoration: 'none', color: '#fcfbfa' }}>
				{title}
			</Nav.Link>
		);
	};

	const handleLogout = () => {
		setIsLogin(false);
		setUserId('');
		sessionStorage.removeItem('userToken');
		navigate('/');
		alert('로그아웃');
	};

	useEffect(() => {
		return () => setShowAuthModal(false);
	}, []);

	return (
		<>
			<StyledHeaderContainer fluid>
				<Navbar>
					<Container>
						<Navbar.Brand href="/">
							<img src="/balanceatLogo.png" />
						</Navbar.Brand>
						<Nav>
							<Navbar.Collapse>
								<Nav>
									{createLink('/', '메인페이지')}
									{createLink('/balanceat', 'BalancEat')}
									<Nav.Link href="/recommand">오늘 뭐 먹지?</Nav.Link>
									{isLogin ? (
										<Nav.Link href={`/userpage/${userId}`}>
											사용자페이지
										</Nav.Link>
									) : (
										<Nav.Link
											href={`/userpage/${userId}`}
											style={{ visibility: 'hidden' }}
										>
											사용자페이지
										</Nav.Link>
									)}
								</Nav>
							</Navbar.Collapse>

							{!isLogin ? (
								<Button
									outline
									color="white_85"
									// variant="outline-light"
									onClick={() => setShowAuthModal(true)}
									style={{ marginLeft: '1rem' }}
								>
									Sign in
								</Button>
							) : (
								<Button
									outline
									color="white_85"
									// variant="outline-light"
									onClick={handleLogout}
									style={{ marginLeft: '1rem' }}
								>
									Sign Out
								</Button>
							)}
						</Nav>
					</Container>
				</Navbar>
			</StyledHeaderContainer>

			{showAuthModal && <AuthModal show={showAuthModal} setShow={setShowAuthModal} />}
		</>
	);
};

export default Header;
