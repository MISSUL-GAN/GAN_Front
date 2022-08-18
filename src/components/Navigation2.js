import { AppBar, Avatar, Container, Fade, IconButton, Menu, MenuItem, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
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
                        <Link to="/home"><img style={{ width: "6rem" }} src="/img/naviLogo.png" alt="logo" /></Link>
                        <Box sx={{ flexGrow: 1 }}></Box>
                        <NavLink to="/create" className="navItem">GAN 사진 변환</NavLink>
                        <NavLink to="/home" className="navItem">미슐간</NavLink>

                        {member.signed
                            ? <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar src={member.profileImage} sx={{ width: "4rem", height: "4rem" }} />
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
                        >
                            <MenuItem onClick={navigateToMy}>
                                MY
                            </MenuItem>
                            <MenuItem onClick={logout}>
                                로그아웃
                            </MenuItem>
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

