import { Container } from "@mui/system";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { convertImage } from "../api/imageApi";
import { saveFileName, clearFileName } from "../redux/drawingCreateReducer";
import Message from "./Message";

const CreateDrawingContainer = () => {

    const dispatch = useDispatch();
    const dispatchClearFileName = () => dispatch(clearFileName());
    const dispatchFileName = (fileName) => dispatch(saveFileName(fileName));

    const [isLoading, setIsLoading] = useState(false);

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const closeAlert = () => setAlertOpen(false);
    const openAlert = (message) => {
        setAlertMessage(message);
        setAlertOpen(true);
    }

    const getFakeFileName = async () => ({
        fileName: "bafkreiaklcbiaba6vn2srcobaaocjnkfc2crc2r3mtsm6qz2vq4uutylbm",
        type: "JPEG"
    });

    const convert = async (originImage, styleImage, tag) => {
        dispatchClearFileName(); // 클리어가 제대로 안될것같은데...?
        setIsLoading(true);
        try {
            const { fileName } = await convertImage(originImage, styleImage, tag);
            // const { fileName } = await getFakeFileName();
            dispatchFileName(fileName);
        }
        catch (e) {
            console.log(e);
        }
        setIsLoading(false);
    };

    const outletContext = { convert, isLoading, openAlert };

    return (
        <>
            <Container sx={{ my: 3 }}>
                <div className="logo"> <img src="/img/textLogo.png" alt="" /> </div>
                <Outlet context={outletContext} />
                <Message open={alertOpen} message={alertMessage} severity="error" handleClose={closeAlert} />
            </Container>
        </>
    );
};

export default CreateDrawingContainer;