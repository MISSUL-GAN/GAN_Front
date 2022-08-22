import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router';
import './Home.css';
import Drawing from './Drawing';
import LoginAlert from "../components/LoginAlert";
import { Container } from "@mui/system";
import { Outlet } from "react-router-dom";

function Home() {
  const [filter, setFilter] = useState("mostlike");

  const scrollRef = useRef();

  const navigate = useNavigate();

  const openDetailModal = (drawing) => { navigate(`${drawing.id}`) };

  const [loginAlertExpanded, setLoginAlertExpanded] = useState(false);
  const handleLoginAlertClose = () => setLoginAlertExpanded(false);
  const openLoginAlert = () => { setLoginAlertExpanded(true); }

  let testpic = [
    {
      "createdAt": "2022-08-11 20:32:00",
      "description": "망고.. 맛있음",
      "fileName": "filename1",
      "id": 1,
      "member": {
        "accountEmail": "vipyoujin@daum.net",
        "id": 1,
        "profileImage": "http://k.kakaocdn.net/dn/ctWVgw/btrHSMftNhz/jlmr9WNt7eGbHqW9wcsPH0/img_640x640.jpg",
        "profileNickname": "유진",
        "name": "작가1"
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
      "title": "첫번째 그림"
    },
    {
      "createdAt": "2022-08-11 20:32:00",
      "description": "망고.. 맛있음",
      "fileName": "filename1",
      "id": 1,
      "member": {
        "accountEmail": "vipyoujin@daum.net",
        "id": 2,
        "profileImage": "http://k.kakaocdn.net/dn/ctWVgw/btrHSMftNhz/jlmr9WNt7eGbHqW9wcsPH0/img_640x640.jpg",
        "profileNickname": "유진",
        "name": "작가2"
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
      "title": "두번째 그림"
    },
    {
      "createdAt": "2022-08-11 20:32:00",
      "description": "망고.. 맛있음",
      "fileName": "filename1",
      "id": 1,
      "member": {
        "accountEmail": "vipyoujin@daum.net",
        "id": 3,
        "profileImage": "http://k.kakaocdn.net/dn/ctWVgw/btrHSMftNhz/jlmr9WNt7eGbHqW9wcsPH0/img_640x640.jpg",
        "profileNickname": "유진",
        "name": "작가3"
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
      "id": 1,
      "member": {
        "accountEmail": "vipyoujin@daum.net",
        "id": 4,
        "profileImage": "http://k.kakaocdn.net/dn/ctWVgw/btrHSMftNhz/jlmr9WNt7eGbHqW9wcsPH0/img_640x640.jpg",
        "profileNickname": "유진",
        "name": "작가4"
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
        "name": "작가5"
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
      "id": 1,
      "member": {
        "accountEmail": "vipyoujin@daum.net",
        "id": 6,
        "profileImage": "http://k.kakaocdn.net/dn/ctWVgw/btrHSMftNhz/jlmr9WNt7eGbHqW9wcsPH0/img_640x640.jpg",
        "profileNickname": "유진",
        "name": "작가6"
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
      "id": 1,
      "member": {
        "accountEmail": "vipyoujin@daum.net",
        "id": 7,
        "profileImage": "http://k.kakaocdn.net/dn/ctWVgw/btrHSMftNhz/jlmr9WNt7eGbHqW9wcsPH0/img_640x640.jpg",
        "profileNickname": "유진",
        "name": "작가7"
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
    }
  ];

  const changeFilter = (e) => {
    if (e.target.value === "mostlike") {
      document.getElementById(e.target.value).style.color = "#3C6B50";
      document.getElementById("random").style.color = "#8E9398";
    }
    else {
      document.getElementById(e.target.value).style.color = "#3C6B50";
      document.getElementById("mostlike").style.color = "#8E9398";
    }

    setFilter(e.target.value);
  }

  const checkTag = (e) => {
    document.getElementById(e.target.className).checked = (document.getElementById(e.target.className).checked) ? false : true;

    if (document.getElementById(e.target.className).checked) {
      document.getElementsByClassName(e.target.className)[0].style.backgroundColor = "#3C6B50";
      document.getElementsByClassName(e.target.className)[0].style.color = "#F4F4F4";
    }
    else {
      document.getElementsByClassName(e.target.className)[0].style.backgroundColor = "#F4F4F4";
      document.getElementsByClassName(e.target.className)[0].style.color = "#3C6B50";
    }
    const tagBox = document.getElementsByName("tagBox");
    tagBox.forEach(tag => { if (tag.checked) console.log(tag.value); });
  }

  useEffect(() => {
    document.getElementById("mostlike").style.color = "#3C6B50";

    scrollRef.current.addEventListener('wheel', (e) => {
      e.preventDefault();
      const x = scrollRef.current.scrollLeft;
      scrollRef.current.scrollTo(x + e.deltaY / 5, 0);
    });
  }, []);

  return (
    <div className="homecontainer">
      <div className="tagOptionBox">
        <div> <img src="/img/textLogo.png" alt="" /> </div>
        <p className="tagGuide"> 필터를 통해 원하는 이미지를 찾아보세요 </p>

        <div className="tagBox">
          <button className="100" onClick={checkTag}> <input id="100" name="tagBox" type="checkbox" value="어두운" /> 어두운 </button>
          <button className="200" onClick={checkTag}> <input id="200" name="tagBox" type="checkbox" value="화사한" /> 화사한 </button>
          <button className="300" onClick={checkTag}> <input id="300" name="tagBox" type="checkbox" value="다채로운" /> 다채로운 </button>
          <button className="400" onClick={checkTag}> <input id="400" name="tagBox" type="checkbox" value="차분한" /> 차분한 </button>
          <button className="500" onClick={checkTag}> <input id="500" name="tagBox" type="checkbox" value="강렬한" /> 강렬한 </button>
          <button className="600" onClick={checkTag}> <input id="600" name="tagBox" type="checkbox" value="차가운" /> 차가운 </button>
          <button className="700" onClick={checkTag}> <input id="700" name="tagBox" type="checkbox" value="따뜻한" /> 따뜻한 </button><br /><br />
        </div>

        <div className="tagBox">
          <button className="800" onClick={checkTag}> <input id="800" name="tagBox" type="checkbox" value="반고흐" /> 반 고흐 </button>
          <button className="900" onClick={checkTag}> <input id="900" name="tagBox" type="checkbox" value="클로드모네" /> 클로드 모네 </button>
          <button className="1000" onClick={checkTag}> <input id="1000" name="tagBox" type="checkbox" value="폴세잔" /> 폴 세잔 </button>
          <button className="1100" onClick={checkTag}> <input id="1100" name="tagBox" type="checkbox" value="우키요에" /> 우키요에 </button>
          <button className="1200" onClick={checkTag}> <input id="1200" name="tagBox" type="checkbox" value="풍경" /> 풍경 </button>
          <button className="1300" onClick={checkTag}> <input id="1300" name="tagBox" type="checkbox" value="동물" /> 동물 </button>
          <button className="1400" onClick={checkTag}> <input id="1400" name="tagBox" type="checkbox" value="인물" /> 인물 </button>
          <button className="1500" onClick={checkTag}> <input id="1500" name="tagBox" type="checkbox" value="기타" /> 기타 </button>
        </div>
      </div>

      <div className="viewOptionBox">
        <button className="refresh"> 이미지 새로고침 </button>

        <div className="optionBox">
          <button className="viewOption" id="mostlike" value="mostlike" onClick={changeFilter}> 좋아요순 </button>
          <button className="viewOption" disabled> | </button>
          <button className="viewOption" id="random" value="random" onClick={changeFilter}> 랜덤순 </button>
        </div>
      </div>

      <div className="drawingBox" ref={scrollRef}>
        {
          testpic.map((element) =>
            <div className="drawing-container" ref={scrollRef}>
              <Drawing key={element.id} drawing={element} openDetailModal={openDetailModal} openLoginAlert={openLoginAlert} />
            </div>
          )
        }
      </div>

      {loginAlertExpanded && <LoginAlert handleLoginAlertClose={handleLoginAlertClose} />}

      <Outlet />
    </div>
  );
}

export default Home;