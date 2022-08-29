import { AppBar, Avatar, Container, Fade, IconButton, Menu, MenuItem, styled, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useMatch, useNavigate } from "react-router-dom";
import { clearMember } from "../redux/memberReducer";
import { clearToken } from "../util/tokenUtil";
import LoginAlert from "./LoginAlert";
import './Navigation2.css'

function Navigation2() {
    const dispatch = useDispatch();
    const member = useSelector(state => state.member);
    const navigate = useNavigate();

    const [loginAlertExpanded, setLoginAlertExpanded] = useState(false);
    const handleLoginAlertClose = () => setLoginAlertExpanded(false);
    const openLoginAlert = () => { setLoginAlertExpanded(true); }

    const [anchorElUser, setAnchorElUser] = useState(null);
    const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
    const handleCloseUserMenu = () => setAnchorElUser(null);

    const logout = async () => {
        clearToken();
        dispatch(clearMember());
        handleCloseUserMenu();
        navigateToHome();
    };

    const navigateToHome = () => navigate("home");

    const navigateToMy = () => {
        navigate("/myPage");
        handleCloseUserMenu();
    }

    const myPageMatched = useMatch("/myPage");
    const active = {
        border: "4px solid #3C6B50",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.15)",
    };
    const inactive = {
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.15)"
    }

    const CenteredMenuItem = styled(MenuItem)`
        justify-content:center;
    `;

    return (
        <div>
            <AppBar
                color="transparent"
                position="relative"
                elevation={0}
                style={{ borderBottom: "1px solid #E7E7E7" }}
            >
                <Container maxWidth="xl" disableGutters={true}>
                    <Toolbar>
                        <Link to="/home"><img style={{ width: "5rem" }} src="/img/naviLogo.png" alt="logo" /></Link>
                        <Box sx={{ flexGrow: 1 }}></Box>
                        <a href="https://opensea.io/collection/missulgan-art" target="_blank" className="navItem">NFT Collection</a>
                        <NavLink to="/create" className="navItem">GAN 사진 변환</NavLink>
                        <NavLink to="/home" className="navItem">미슐간</NavLink>

                        {member.signed
                            ?
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} style={myPageMatched ? active : inactive}>
                                <Avatar src={member.profileImage} sx={{ width: "52px", height: "52px" }} />
                            </IconButton>
                            : <button className="navItem" onClick={openLoginAlert}>로그인</button>
                        }
                        <Menu
                            sx={{ mt: '5px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                            TransitionComponent={Fade}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                        >
                            <CenteredMenuItem onClick={navigateToMy}>
                                MY
                            </CenteredMenuItem>
                            <CenteredMenuItem onClick={logout}>
                                로그아웃
                            </CenteredMenuItem>
                        </Menu>
                    </Toolbar>
                </Container>
            </AppBar>
            {loginAlertExpanded && (
                <LoginAlert handleLoginAlertClose={handleLoginAlertClose} />
            )}
        </div>
    );
}

export default Navigation2;

