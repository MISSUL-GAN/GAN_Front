import { Container } from "@mui/system";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { convertImage } from "../api/imageApi";
import Message from "./Message";

const CreateRoute = () => {

    const [convertedImage, setConvertedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [presetTagId, setPreset] = useState(null);
    const setPresetTagId = (preset) => {
        if(preset === "cnn")
            setPreset(null);
        else
            setPreset(preset);
    };

    const closeAlert = () => setAlertOpen(false);
    const openAlert = (message) => {
        setAlertMessage(message);
        setAlertOpen(true);
    }

    const convert = async (originImage, styleImage, tag) => {
        setConvertedImage(null);
        setIsLoading(true);
        try {
            const { fileName } = await convertImage(originImage, styleImage, tag);
            // const fileName = "bafkreia2a24w552huefobv5q6dm7erxsnm4ohczochh5wsz6ijfto5mxiu";
            setConvertedImage(fileName);
        }
        catch (e) {
            console.log(e);
        }
        setIsLoading(false);
    };

    const outletContext = { setPresetTagId, convert, isLoading, presetTagId, fileName: convertedImage, openAlert };
    return (
        <>
            <Container sx={{ my: 6 }}>
                <div className="logo"> <img src="/img/textLogo.png" alt="" /> </div>
                <Outlet context={outletContext} />
                <Message open={alertOpen} message={alertMessage} severity="error" handleClose={closeAlert} />
            </Container>
        </>
    );
};

export default CreateRoute;