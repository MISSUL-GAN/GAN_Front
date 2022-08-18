import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import UserDrawing from '../routes/UserDrawing';
import './MyPage.css';
import isLogin from "../isLogin";
import { getDrawings, deleteDrawing } from "../api/drawingApi";
import { getScrap } from "../api/scrapApi";


function MyPage() {
    const [option, setOption] = useState("my");
    const [testpic, setTestPic] = useState([]);
    const [testpic2, setTestPic2] = useState([
        {
            "createdAt": "2022-08-11 20:32:00",
            "description": "망고.. 맛있음",
            "fileName": "filename1",
            "id": 10,
            "member": {
                "accountEmail": "vipyoujin@daum.net",
                "id": 1,
                "profileImage": "http://k.kakaocdn.net/dn/ctWVgw/btrHSMftNhz/jlmr9WNt7eGbHqW9wcsPH0/img_640x640.jpg",
                "profileNickname": "유진",
                "userNickname": "작가1"
            },
            "heartCount": 0,
            "nft": {
                "assetContractAddress": "string",
                "tokenId": "string"
            },
            "scrapCount": 0,
            "tags": [
                {
                    "id": 1,
                    "name": "어두운"
                },
                {
                    "id": 2,
                    "name": "화사한"
                }
            ],
            "title": "1"
        },
        {
            "createdAt": "2022-08-11 20:32:00",
            "description": "망고.. 맛있음",
            "fileName": "filename1",
            "id": 11,
            "member": {
                "accountEmail": "vipyoujin@daum.net",
                "id": 2,
                "profileImage": "http://k.kakaocdn.net/dn/ctWVgw/btrHSMftNhz/jlmr9WNt7eGbHqW9wcsPH0/img_640x640.jpg",
                "profileNickname": "유진",
                "userNickname": "작가2"
            },
            "heartCount": 0,
            "nft": {
                "assetContractAddress": "string",
                "tokenId": "string"
            },
            "scrapCount": 0,
            "tags": [
                {
                    "id": 1,
                    "name": "어두운"
                },
                {
                    "id": 2,
                    "name": "화사한"
                }
            ],
            "title": "2"
        },
        {
            "createdAt": "2022-08-11 20:32:00",
            "description": "망고.. 맛있음",
            "fileName": "filename1",
            "id": 12,
            "member": {
                "accountEmail": "vipyoujin@daum.net",
                "id": 3,
                "profileImage": "http://k.kakaocdn.net/dn/ctWVgw/btrHSMftNhz/jlmr9WNt7eGbHqW9wcsPH0/img_640x640.jpg",
                "profileNickname": "유진",
                "userNickname": "작가3"
            },
            "heartCount": 0,
            "nft": {
                "assetContractAddress": "string",
                "tokenId": "string"
            },
            "scrapCount": 0,
            "tags": [
                {
                    "id": 1,
                    "name": "어두운"
                },
                {
                    "id": 2,
                    "name": "화사한"
                }
            ],
            "title": "3"
        },
        {
            "createdAt": "2022-08-11 20:32:00",
            "description": "망고.. 맛있음",
            "fileName": "filename1",
            "id": 13,
            "member": {
                "accountEmail": "vipyoujin@daum.net",
                "id": 4,
                "profileImage": "http://k.kakaocdn.net/dn/ctWVgw/btrHSMftNhz/jlmr9WNt7eGbHqW9wcsPH0/img_640x640.jpg",
                "profileNickname": "유진",
                "userNickname": "작가4"
            },
            "heartCount": 0,
            "nft": {
                "assetContractAddress": "string",
                "tokenId": "string"
            },
            "scrapCount": 0,
            "tags": [
                {
                    "id": 1,
                    "name": "어두운"
                },
                {
                    "id": 2,
                    "name": "화사한"
                }
            ],
            "title": "4"
        },
        {
            "createdAt": "2022-08-11 20:32:00",
            "description": "망고.. 맛있음",
            "fileName": "filename1",
            "id": 14,
            "member": {
                "accountEmail": "vipyoujin@daum.net",
                "id": 1,
                "profileImage": "http://k.kakaocdn.net/dn/ctWVgw/btrHSMftNhz/jlmr9WNt7eGbHqW9wcsPH0/img_640x640.jpg",
                "profileNickname": "유진",
                "userNickname": "작가5"
            },
            "heartCount": 0,
            "nft": {
                "assetContractAddress": "string",
                "tokenId": "string"
            },
            "scrapCount": 0,
            "tags": [
                {
                    "id": 1,
                    "name": "어두운"
                },
                {
                    "id": 2,
                    "name": "화사한"
                }
            ],
            "title": "5"
        },
        {
            "createdAt": "2022-08-11 20:32:00",
            "description": "망고.. 맛있음",
            "fileName": "filename1",
            "id": 15,
            "member": {
                "accountEmail": "vipyoujin@daum.net",
                "id": 6,
                "profileImage": "http://k.kakaocdn.net/dn/ctWVgw/btrHSMftNhz/jlmr9WNt7eGbHqW9wcsPH0/img_640x640.jpg",
                "profileNickname": "유진",
                "userNickname": "작가6"
            },
            "heartCount": 0,
            "nft": {
                "assetContractAddress": "string",
                "tokenId": "string"
            },
            "scrapCount": 0,
            "tags": [
                {
                    "id": 1,
                    "name": "어두운"
                },
                {
                    "id": 2,
                    "name": "화사한"
                }
            ],
            "title": "6"
        },
        {
            "createdAt": "2022-08-11 20:32:00",
            "description": "망고.. 맛있음",
            "fileName": "filename1",
            "id": 16,
            "member": {
                "accountEmail": "vipyoujin@daum.net",
                "id": 7,
                "profileImage": "http://k.kakaocdn.net/dn/ctWVgw/btrHSMftNhz/jlmr9WNt7eGbHqW9wcsPH0/img_640x640.jpg",
                "profileNickname": "유진",
                "userNickname": "작가7"
            },
            "heartCount": 0,
            "nft": {
                "assetContractAddress": "string",
                "tokenId": "string"
            },
            "scrapCount": 0,
            "tags": [
                {
                    "id": 1,
                    "name": "어두운"
                },
                {
                    "id": 2,
                    "name": "화사한"
                }
            ],
            "title": "7"
        },
        {
            "createdAt": "2022-08-11 20:32:00",
            "description": "망고.. 맛있음",
            "fileName": "filename1",
            "id": 17,
            "member": {
                "accountEmail": "vipyoujin@daum.net",
                "id": 7,
                "profileImage": "http://k.kakaocdn.net/dn/ctWVgw/btrHSMftNhz/jlmr9WNt7eGbHqW9wcsPH0/img_640x640.jpg",
                "profileNickname": "유진",
                "userNickname": "작가8"
            },
            "heartCount": 0,
            "nft": {
                "assetContractAddress": "string",
                "tokenId": "string"
            },
            "scrapCount": 0,
            "tags": [
                {
                    "id": 1,
                    "name": "어두운"
                },
                {
                    "id": 2,
                    "name": "화사한"
                }
            ],
            "title": "8"
        },
        {
            "createdAt": "2022-08-11 20:32:00",
            "description": "망고.. 맛있음",
            "fileName": "filename1",
            "id": 18,
            "member": {
                "accountEmail": "vipyoujin@daum.net",
                "id": 7,
                "profileImage": "http://k.kakaocdn.net/dn/ctWVgw/btrHSMftNhz/jlmr9WNt7eGbHqW9wcsPH0/img_640x640.jpg",
                "profileNickname": "유진",
                "userNickname": "작가9"
            },
            "heartCount": 0,
            "nft": {
                "assetContractAddress": "string",
                "tokenId": "string"
            },
            "scrapCount": 0,
            "tags": [
                {
                    "id": 1,
                    "name": "어두운"
                },
                {
                    "id": 2,
                    "name": "화사한"
                }
            ],
            "title": "9"
        }
    ]);

    useEffect(() => {
        async function getMyDrawings(){
            console.log(await getDrawings());
            setTestPic(await getDrawings());
        }

        async function getMyScrap(){
            console.log(await getScrap());
            //setTestPic2(await getScrap());
        }

        getMyDrawings();
        getMyScrap();
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
        setTestPic(testpic.filter((item) => item.id !== id));
        deleteDrawing(id);
    }

    const block = () => {
        alert("정상적이지 않은 접근입니다.");
        window.location.href = '/home';
    }

    return (
        <>
            {isLogin()
                ?
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
                            {testpic.length === 0
                                ?
                                <p id="nodrawing"> 아직 작품이 존재하지 않습니다. </p>
                                :
                                <>
                                    <div id="drawingBox1">
                                        {option === "my"
                                            ?
                                            testpic.slice(0, 4).map((element, index) =>
                                                <UserDrawing key={element.id} ind={index} drawing={element} mine={true} clickDelete={clickDelete} />
                                            )
                                            :
                                            testpic2.slice(0, 4).map((element, index) =>
                                                <UserDrawing key={element.id} ind={index} drawing={element} />
                                            )
                                        }
                                    </div>

                                    <div id="drawingBox2">
                                        {option === "my"
                                            ?
                                            testpic.slice(4, 6).map((element, index) =>
                                                <UserDrawing key={element.id} ind={index + 4} drawing={element} mine={true} clickDelete={clickDelete} />
                                            )
                                            :
                                            testpic2.slice(4, 6).map((element, index) =>
                                                <UserDrawing key={element.id} ind={index + 4} drawing={element} />
                                            )
                                        }
                                    </div>

                                    <div id="drawingBox3">
                                        {option === "my"
                                            ?
                                            testpic.slice(6,).map((element, index) =>
                                                <UserDrawing key={element.id} ind={index + 6} drawing={element} mine={true} clickDelete={clickDelete} />
                                            )
                                            :
                                            testpic2.slice(6,).map((element, index) =>
                                                <UserDrawing key={element.id} ind={index + 6} drawing={element} />
                                            )
                                        }
                                    </div>
                                </>

                            }

                        </div>
                    </div>
                </>
                :
                block()
            }
        </>
    );

}

export default MyPage;