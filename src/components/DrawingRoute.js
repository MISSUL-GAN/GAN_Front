import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router';
import { getDrawing } from '../api/drawingApi';
import LoginAlert from './LoginAlert';
import DetailModal from "../routes/DetailModal";

const DrawingRoute = () => {
    const navigate = useNavigate();
    const navigateToHome = useCallback(() => navigate('/home'), [navigate]);

    const { drawingId } = useParams();
    const [drawing, setDrawing] = useState(null);

    const [loginAlertExpanded, setLoginAlertExpanded] = useState(false);
    const handleLoginAlertClose = () => { setLoginAlertExpanded(false); }
    const handleLoginAlertOpen = () => { setLoginAlertExpanded(true); }

    const handleDetailModalClose = navigateToHome;

    useEffect(() => {
        getDrawing(drawingId)
            .then(setDrawing)
            .catch(navigateToHome)
    }, [drawingId, navigateToHome]);

    return (
        <>
            {drawing && (
                <DetailModal drawing={drawing} handleDetailModalClose={handleDetailModalClose} openLoginAlert={handleLoginAlertOpen} />
            )}
            {loginAlertExpanded && (
                <LoginAlert handleLoginAlertClose={handleLoginAlertClose} />
            )}
        </>
    );
};

export default DrawingRoute;