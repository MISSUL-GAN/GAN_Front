import React from "react";
import Navigation from "../components/Navigation";
import { useDispatch } from 'react-redux';

function ApiTestPage() {
    const dispatch = useDispatch();

    return (
        <div>
            <Navigation />
            <div>API Test Page</div>
        </div>
    );
}

export default ApiTestPage;