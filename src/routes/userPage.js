import React, { useEffect } from "react";
import Navigation from "../components/Navigation";
import UserDrawing from "./UserDrawing";
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
      "fileName": "filename1",
      "id": 1,
      "member": {
        "accountEmail": "vipyoujin@daum.net",
        "id": 1,
        "profileImage": "http://k.kakaocdn.net/dn/ctWVgw/btrHSMftNhz/jlmr9WNt7eGbHqW9wcsPH0/img_640x640.jpg",
        "profileNickname": "유진",
        "userNickname": "작가1"
      },
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
        "userNickname": "작가2"
      },
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
        "userNickname": "작가3"
      },
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
        "userNickname": "작가4"
      },
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
        "userNickname": "작가6"
      },
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
        "userNickname": "작가7"
      },
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
      "id": 1,
      "member": {
        "accountEmail": "vipyoujin@daum.net",
        "id": 7,
        "profileImage": "http://k.kakaocdn.net/dn/ctWVgw/btrHSMftNhz/jlmr9WNt7eGbHqW9wcsPH0/img_640x640.jpg",
        "profileNickname": "유진",
        "userNickname": "작가8"
      },
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
      "id": 1,
      "member": {
        "accountEmail": "vipyoujin@daum.net",
        "id": 7,
        "profileImage": "http://k.kakaocdn.net/dn/ctWVgw/btrHSMftNhz/jlmr9WNt7eGbHqW9wcsPH0/img_640x640.jpg",
        "profileNickname": "유진",
        "userNickname": "작가9"
      },
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
                <UserDrawing ind={index} />
              )
            }
          </div>

          <div id="drawingBox2">
            {
              testpic.slice(4, 6).map((element, index) =>
                <UserDrawing ind={index + 4} />
              )
            }
          </div>

          <div id="drawingBox3">
            {
              testpic.slice(6,).map((element, index) =>
                <UserDrawing ind={index + 6} />
              )
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default UserPage;