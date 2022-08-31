import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { clear } from "../redux/drawingCreateReducer";
import CreateDrawing from "../routes/CreateDrawing";
import SaveDrawing from "../routes/SaveDrawing";
import CreateDrawingContainer from "./CreateDrawingContainer";
import WalletHelpModal from "./WalletHelpModal";

const CreateRoute = () => {

    const dispatch = useDispatch();
    const dispatchClear = () => dispatch(clear());

    useEffect(() => dispatchClear);
    return (
        <Routes>
            <Route element={<CreateDrawingContainer />}>
                <Route exact path='' element={<CreateDrawing />} />
                <Route exact path='save' element={<SaveDrawing />}>
                    <Route exact path='help' element={<WalletHelpModal />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default CreateRoute;