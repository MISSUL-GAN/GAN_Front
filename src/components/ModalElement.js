import React from "react";
import { Container, Dialog as MUIDialog, Grow, useMediaQuery, useTheme } from "@mui/material";
import { styled } from "@mui/system";
import style from "styled-components";

const ButtonContainer = style.div`
    display: flex;
    align-items: center;
    justify-content: right;
    margin: 15px 10px;
`;

const StyledContainer = styled(Container)`
    minHeight: 750px;
    maxHeight: 70%;
    overflow: scroll;
`;
const ModalElement = ({ open = true, handleClose, children, width = "md" }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <MUIDialog
            fullWidth
            fullScreen={fullScreen}
            maxWidth={width}
            open={open}
            onClose={handleClose}
            sx={{ '& .MuiDialog-paper': { borderRadius: "10px" } }}
            TransitionComponent={Grow}
        >
            <ButtonContainer>
                <button onClick={handleClose}>
                    <img src="/img/closeButton.png" alt="" width="30" />
                </button>
            </ButtonContainer>
            <StyledContainer>
                {children}
            </StyledContainer>
        </MUIDialog>
    );
};

export default ModalElement;