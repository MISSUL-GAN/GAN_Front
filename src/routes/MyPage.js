import axios from "axios";
import React, { useState } from "react";
import Navigation from "../components/Navigation";
import UserDrawing from '../routes/UserDrawing';
import { useSelector } from 'react-redux';
import './MyPage.css';

function MyPage() {
    const user = useSelector(state => state);
    const [option, setOption] = useState("my");
    const [testpic, setTestPic] = useState([
        {
            "createdAt": "2022-08-11 20:32:00",
            "description": "망고.. 맛있음",
            "fileName": "filename1",
            "heartCount": 0,
            "id": 1,
            "member": {
                "accountEmail": "vipyoujin@daum.net",
                "id": 5,
                "profileImage": "http://k.kakaocdn.net/dn/ctWVgw/btrHSMftNhz/jlmr9WNt7eGbHqW9wcsPH0/img_640x640.jpg",
                "profileNickname": "유진",
                "userNickname": "작가1"
            },
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
            "title": "첫번째 그림"
        },
        {
            "createdAt": "2022-08-11 20:32:00",
            "description": "망고.. 맛있음",
            "fileName": "filename1",
            "heartCount": 0,
            "id": 2,
            "member": {
                "accountEmail": "vipyoujin@daum.net",
                "id": 2,
                "profileImage": "http://k.kakaocdn.net/dn/ctWVgw/btrHSMftNhz/jlmr9WNt7eGbHqW9wcsPH0/img_640x640.jpg",
                "profileNickname": "유진",
                "userNickname": "작가2"
            },
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
            "title": "두번째 그림"
        },
        {
            "createdAt": "2022-08-11 20:32:00",
            "description": "망고.. 맛있음",
            "fileName": "filename1",
            "id": 3,
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
            "title": "세번째 그림"
        },
        {
            "createdAt": "2022-08-11 20:32:00",
            "description": "망고.. 맛있음",
            "fileName": "filename1",
            "id": 4,
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
            "title": "네번째 그림"
        },
        {
            "createdAt": "2022-08-11 20:32:00",
            "description": "망고.. 맛있음",
            "fileName": "filename1",
            "id": 5,
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
            "title": "다섯번째 그림"
        },
        {
            "createdAt": "2022-08-11 20:32:00",
            "description": "망고.. 맛있음",
            "fileName": "filename1",
            "id": 6,
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
            "title": "여섯번째 그림"
        },
        {
            "createdAt": "2022-08-11 20:32:00",
            "description": "망고.. 맛있음",
            "fileName": "filename1",
            "id": 7,
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
            "title": "일곱번째 그림"
        },
        {
            "createdAt": "2022-08-11 20:32:00",
            "description": "망고.. 맛있음",
            "fileName": "filename1",
            "id": 8,
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
            "title": "여덟번째 그림"
        },
        {
            "createdAt": "2022-08-11 20:32:00",
            "description": "망고.. 맛있음",
            "fileName": "filename1",
            "id": 9,
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
            "title": "아홉번째 그림"
        }
    ]);
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
        setTestPic(testpic.filter((item)=> item.id !== id));
        
        axios.delete(`/drawing/${id}`, {
            headers: {
              Authorization: `Bearer ${user.aToken}`,
            }
        });
    }

    return (
        <>
            <Navigation />

            <div id="page-content">
                <div id="viewOptionBox">
                    <button className="viewOption" id="my" onClick={clickOption}>
                        내 작품
                        <hr />
                    </button>

                    <button className="viewOption" id="bookmark" onClick={clickOption}>
                        스크랩한 작품
                        <hr />
                    </button>
                </div>

                <div id="drawing-container">
                    <div id="drawingBox1">
                        {option === "my"
                            ?
                            testpic.slice(0, 4).map((element, index) =>
                                <UserDrawing key={element.id} ind={index} drawing={element} mine={true} clickDelete={clickDelete}/>
                            )
                            :
                            testpic2.slice(0, 4).map((element, index) =>
                                <UserDrawing key={element.id} ind={index} drawing={element}/>
                            )
                        }
                    </div>

                    <div id="drawingBox2">
                        {option === "my"
                            ?
                            testpic.slice(4, 6).map((element, index) =>
                                <UserDrawing key={element.id} ind={index + 4} drawing={element} mine={true} clickDelete={clickDelete}/>
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