import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router';
import LoginAlert from './LoginAlert';

const AuthRoute = () => {
    const member = useSelector(state => state.member);
    const navigate = useNavigate();
    const navigateBack = () => navigate(-1);

    const [loginAlertExpanded, setLoginAlertExpanded] = useState(!member.signed);
    const handleLoginAlertClose = () => {setLoginAlertExpanded(false);navigateBack();}

    return (
        <>
            {loginAlertExpanded && (
                <LoginAlert handleLoginAlertClose={handleLoginAlertClose} />
            )}
            <Outlet />
        </>
    );
};

export default AuthRoute;