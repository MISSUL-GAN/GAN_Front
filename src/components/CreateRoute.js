import { Container } from "@mui/system";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { convertImage } from "../api/imageApi";

const CreateRoute = () => {

    const [convertedImage, setConvertedImage] = useState(null);
    const convert = async (originImage, styleImage, tag) => {
        // const { fileName } = await convertImage(originImage, styleImage, tag);
        // setConvertedImage(fileName);
        const fileName = "bafkreia2a24w552huefobv5q6dm7erxsnm4ohczochh5wsz6ijfto5mxiu";
        console.log(originImage, styleImage, tag);
        setConvertedImage(fileName);
    };

    const outletContext = { convert: convert, fileName: convertedImage };
    return (
        <>
            <Container sx={{ my: 6 }}>
                <div className="logo"> <img src="/img/textLogo.png" alt="" /> </div>
                <Outlet context={outletContext} />
            </Container>
        </>
    );
};

export default CreateRoute;