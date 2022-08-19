import React, { useEffect, useState } from 'react';
import { Outlet, useParams, useNavigate } from 'react-router';
import { getDrawing } from '../api/drawingApi';


const DrawingRoute = () => {
    const navigate = useNavigate();
    const { drawingId } = useParams();
    const [drawing, setDrawing] = useState(null);

    useEffect(() => {
        const navigateToHome = () => navigate('/home');
        getDrawing(drawingId)
            .then(res => setDrawing(res))
            .catch(navigateToHome)
    }, [drawingId, navigate]);

    return (
        <>
            <>{JSON.stringify(drawing)}</>
            <Outlet />
        </>
    );
};

export default DrawingRoute;