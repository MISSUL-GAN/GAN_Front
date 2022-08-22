import { Alert, Snackbar } from "@mui/material";
import React from "react";

const Message = ({open, handleClose, severity, message}) => {

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity} >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default Message;