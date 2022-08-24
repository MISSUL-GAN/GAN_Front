import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getDrawings, deleteDrawing } from "../api/drawingApi";
import { getScrap, scrap, unscrap } from "../api/scrapApi";
import UserDrawing from '../routes/UserDrawing';
import './MyPage.css';

function MyPage() {
    const navigate = useNavigate();
    
    const [option, setOption] = useState("my");
    const [mydrawing, setMyDrawing] = useState([]);
    const [myscrap, setMyScrap] = useState([]);

    const openDetailModal = (drawing) => { navigate(`${drawing.id}`) }

    useEffect(() => {
        async function getMyPageDrawings() {
            setMyDrawing(await getDrawings());
            setMyScrap(await getScrap());
        }

        getMyPageDrawings();
    }, []);

    const clickOption = (e) => {
        setOption(e.target.id);

        if (e.target.id === "my") {
            document.getElementById("my").style.color = "#3C6B50";
            document.getElementById("bookmark").style.color = "#9F9F9F";
        }
        else {
            document.getElementById("my").style.color = "#9F9F9F";
            document.getElementById("bookmark").style.color = "#3C6B50";
        }
    }

    const clickDelete = (id) => {
        if (option === "my") {
            setMyDrawing(mydrawing.filter((item) => item.id !== id));
            deleteDrawing(id);
        }
        else {
            setMyScrap(myscrap.filter((item) => item.id !== id));
            unscrap(id);
        }
    }

    const clickScrap = (id) => {
        scrap(id);
    }

    const clickUnscrap = (id) => {
        unscrap(id);
    }

    const outletContext = { home: false, clickDelete };
    return (
        <>
            <div id="my-page-content">
                <div id="tabBox">
                    <button id="my" onClick={clickOption}>
                        내 작품
                        <hr />
                    </button>

                    <button id="bookmark" onClick={clickOption}>
                        스크랩한 작품
                        <hr />
                    </button>
                </div>

                <div id="drawing-container">
                    {(mydrawing.length === 0 && option === "my") || (myscrap.length === 0 && option === "bookmark")
                        ?
                        <p id="nodrawing"> 아직 작품이 존재하지 않습니다. </p>
                        :
                        <>
                            <div id="drawingBox1">
                                {option === "my"
                                    ?
                                    mydrawing.slice(0, parseInt(mydrawing.length/3)).map((element) =>
                                        <UserDrawing key={element.id} drawing={element} mine={true} clickDelete={clickDelete} clickScrap={clickScrap} openDetailModal={openDetailModal} />
                                    )
                                    :
                                    myscrap.slice(0, parseInt(myscrap.length/3)).map((element) =>
                                        <UserDrawing key={element.id} drawing={element} clickDelete={clickDelete} clickScrap={clickScrap} clickUnScrap={clickUnscrap} openDetailModal={openDetailModal} />
                                    )
                                }
                            </div>

                            <div id="drawingBox2">
                                {option === "my"
                                    ?
                                    mydrawing.slice(parseInt(mydrawing.length/3), 2 * parseInt(mydrawing.length/3)).map((element) =>
                                        <UserDrawing key={element.id} drawing={element} mine={true} clickDelete={clickDelete} clickScrap={clickScrap} openDetailModal={openDetailModal} />
                                    )
                                    :
                                    myscrap.slice(parseInt(myscrap.length/3), 2 * parseInt(myscrap.length/3)).map((element) =>
                                        <UserDrawing key={element.id} drawing={element} clickDelete={clickDelete} clickScrap={clickScrap} clickUnScrap={clickUnscrap} openDetailModal={openDetailModal} />
                                    )
                                }
                            </div>

                            <div id="drawingBox3">
                                {option === "my"
                                    ?
                                    mydrawing.slice(2 * parseInt(mydrawing.length/3),).map((element) =>
                                        <UserDrawing key={element.id} drawing={element} mine={true} clickDelete={clickDelete} clickScrap={clickScrap} openDetailModal={openDetailModal} />
                                    )
                                    :
                                    myscrap.slice(2 * parseInt(myscrap.length/3),).map((element) =>
                                        <UserDrawing key={element.id} drawing={element} clickScrap={clickScrap} clickUnScrap={clickUnscrap} openDetailModal={openDetailModal} />
                                    )
                                }
                            </div>
                        </>
                    }
                </div>
            </div>

            <Outlet context={outletContext}/>
        </>
    );
}

export default MyPage;