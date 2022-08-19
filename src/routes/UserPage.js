import React, { useEffect } from "react";
import Navigation from "../components/Navigation";
import UserDrawing from "./UserDrawing";
import { scrap, unscrap } from "../api/scrapApi";
import './UserPage.css';

function UserPage() {
  const member = {
    nick: new URL(window.location.href).searchParams.get("member"),
    img: new URL(window.location.href).searchParams.get("img"),
    id: new URL(window.location.href).searchParams.get("id")
  };

  let testpic = [
    {
      "createdAt": "2022-08-11 20:32:00",
      "description": "망고.. 맛있음",
      "fileName": "bafkreiapdwp65rgye2f7isg4bg55mneudaouuuaugctw2qms2aqzr3eeii",
      "id": 1,
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
      "title": "첫번째 그림"
    },
    {
      "createdAt": "2022-08-11 20:32:00",
      "description": "망고.. 맛있음",
      "fileName": "bafkreiapdwp65rgye2f7isg4bg55mneudaouuuaugctw2qms2aqzr3eeii",
      "id": 2,
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
      "title": "두번째 그림"
    },
    {
      "createdAt": "2022-08-11 20:32:00",
      "description": "망고.. 맛있음",
      "fileName": "bafkreiapdwp65rgye2f7isg4bg55mneudaouuuaugctw2qms2aqzr3eeii",
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
      "fileName": "bafkreiapdwp65rgye2f7isg4bg55mneudaouuuaugctw2qms2aqzr3eeii",
      "id": 400,
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
      "fileName": "bafkreiapdwp65rgye2f7isg4bg55mneudaouuuaugctw2qms2aqzr3eeii",
      "id": 500,
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
      "fileName": "bafkreiapdwp65rgye2f7isg4bg55mneudaouuuaugctw2qms2aqzr3eeii",
      "id": 600,
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
      "fileName": "bafkreiapdwp65rgye2f7isg4bg55mneudaouuuaugctw2qms2aqzr3eeii",
      "id": 700,
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
      "fileName": "bafkreiapdwp65rgye2f7isg4bg55mneudaouuuaugctw2qms2aqzr3eeii",
      "id": 800,
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
      "fileName": "bafkreiapdwp65rgye2f7isg4bg55mneudaouuuaugctw2qms2aqzr3eeii",
      "id": 9000,
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
  ];

  useEffect(() => {
    // /drawing/{member.id} 요청해서 그 사용자의 그림 다 받아오기
  }, []);

  const clickScrap = (id) => {
    scrap(id);
  }

  const clickDelete = (id) => {
    unscrap(id);
  }

  return (
    <>
      <Navigation />

      <div id="page-content">
        <div> <img src={member.img} alt="" /> </div>
        <div> {member.nick} </div>
        <hr />

        <div id="drawing-container">
          <div id="drawingBox1">
            {
              testpic.slice(0, 4).map((element, index) =>
                <UserDrawing key={element.id} ind={index} drawing={element} clickDelete={clickDelete} clickScrap={clickScrap}/>
              )
            }
          </div>

          <div id="drawingBox2">
            {
              testpic.slice(4, 6).map((element, index) =>
                <UserDrawing key={element.id} ind={index + 4} drawing={element} clickDelete={clickDelete} clickScrap={clickScrap}/>
              )
            }
          </div>

          <div id="drawingBox3">
            {
              testpic.slice(6,).map((element, index) =>
                <UserDrawing key={element.id} ind={index + 6} drawing={element} clickDelete={clickDelete} clickScrap={clickScrap}/>
              )
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default UserPage;
