import React, { useEffect, useState } from "react";
import { getDrawings, deleteDrawing } from "../api/drawingApi";
import { getScrap, unscrap } from "../api/scrapApi";
import Navigation from "../components/Navigation";
import UserDrawing from '../routes/UserDrawing';
import isLogin from "../isLogin";
import './MyPage.css';

function MyPage() {
    const [option, setOption] = useState("my");
    const [mydrawing, setMyDrawing] = useState([]);
    const [myscrap, setMyScrap] = useState([]);

    useEffect(() => {
        async function getMyPageDrawings(){
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
        if(option === "my"){
            setMyDrawing(mydrawing.filter((item) => item.id !== id));
            deleteDrawing(id);
        }
        else {
            setMyScrap(myscrap.filter((item) => item.id !== id));
            unscrap(id);
        }
    }

    const block = () => {
        alert("정상적이지 않은 접근입니다.");
        window.location.href = '/home';
    }

    return (
        <>
        <Navigation />

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
                            {mydrawing.length === 0
                                ?
                                <p id="nodrawing"> 아직 작품이 존재하지 않습니다. </p>
                                :
                                <>
                                    <div id="drawingBox1">
                                        {option === "my"
                                            ?
                                            mydrawing.slice(0, 4).map((element, index) =>
                                                <UserDrawing key={element.id} ind={index} drawing={element} mine={true} clickDelete={clickDelete} />
                                            )
                                            :
                                            myscrap.slice(0, 4).map((element, index) =>
                                                <UserDrawing key={element.id} ind={index} drawing={element} clickDelete={clickDelete}/>
                                            )
                                        }
                                    </div>

                                    <div id="drawingBox2">
                                        {option === "my"
                                            ?
                                            mydrawing.slice(4, 6).map((element, index) =>
                                                <UserDrawing key={element.id} ind={index + 4} drawing={element} mine={true} clickDelete={clickDelete} />
                                            )
                                            :
                                            myscrap.slice(4, 6).map((element, index) =>
                                                <UserDrawing key={element.id} ind={index + 4} drawing={element} clickDelete={clickDelete}/>
                                            )
                                        }
                                    </div>

                <div id="drawingBox3">
                    {option === "my"
                        ?
                        testpic.slice(6,).map((element, index) =>
                            <UserDrawing key={element.id} ind={index + 6} drawing={element} mine={true} clickDelete={clickDelete}/>
                        )
                        :
                        testpic2.slice(6,).map((element, index) =>
                            <UserDrawing key={element.id} ind={index + 6} drawing={element}/>
                        )
                    }
                </div>
            </div>
        </div>

        </>
    );

}

export default MyPage;