import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { getDrawing } from '../api/drawingApi';

const DrawingRoute = () => {
    const navigate = useNavigate();
    const { drawingId } = useParams();
    const [drawing, setDrawing] = useState(null);

    useEffect(() => {
        const navigateToHome = () => navigate('..');
        getDrawing(drawingId)
            .then(res => setDrawing(res))
            .catch(navigateToHome)
    }, [drawingId, navigate]);

    return (
        <>
            <>{JSON.stringify(drawing)}</>
        </>
    );
};

export default DrawingRoute;