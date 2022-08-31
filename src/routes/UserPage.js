import React, { useEffect, useState, useRef } from "react";
import UserDrawing from "./UserDrawing";
import { scrap, unscrap } from "../api/scrapApi";
import { getMemberDrawings } from "../api/drawingApi";
import { getMemberInfo } from "../api/memberApi";
import LoginAlert from "../components/LoginAlert";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import './UserPage.css';
import { Skeleton } from "@mui/material";

function UserPage() {
  const { memberId } = useParams();
  const [memberDrawings, setMemberDrawings] = useState([]);

  const [memberInfo, setMemberInfo] = useState(null);

  const navigate = useNavigate();

  const openDetailModal = (drawing) => { navigate(`${drawing.id}`) }

  const [loginAlertExpanded, setLoginAlertExpanded] = useState(false);
  const handleLoginAlertClose = () => setLoginAlertExpanded(false);
  const openLoginAlert = () => { setLoginAlertExpanded(true); }

  useEffect(() => {
    async function getUserPageContent() {
      const member = await getMemberInfo(memberId);
      setMemberInfo(member);
      setMemberDrawings(await getMemberDrawings(memberId));
    }

    getUserPageContent();
  }, []);

  const clickScrap = (id) => {
    scrap(id);
  }

  const clickDelete = (id) => {
    unscrap(id);
  }

  const outletContext = { home: false };
  return (
    <>
      <div id="page-content">

        {
          memberInfo ?
            <div className="user-info">
              <div className="user-image"> <img src={memberInfo.profileImage} alt="" /> </div>
              <div className="user-text"> {memberInfo.name} </div>
              <div className="user-text-2"> {memberInfo.accountEmail} </div>
            </div>
            :
            <div className="user-info">
              <Skeleton variant="circular" className="user-image"/>
              <Skeleton className="user-text" width={50}/>
              <Skeleton className="user-text-2" width={150}/>
              {/* <Skeleton variant="text" width={130} height={130}/> */}
            </div>
        }
        <hr />

        <div id="drawing-container">
          {memberDrawings.length === 0
            ?
            <p id="nodrawing"> 아직 작품이 존재하지 않습니다. </p>
            :
            <>
              <div id="drawingBox1">
                {
                  memberDrawings.slice(2 * parseInt(memberDrawings.length / 3),).map((element) =>
                    <UserDrawing key={element.id} drawing={element} clickDelete={clickDelete} clickScrap={clickScrap} openDetailModal={openDetailModal} openLoginAlert={openLoginAlert} />
                  )
                }
              </div>

              <div id="drawingBox2">
                {
                  memberDrawings.slice(parseInt(memberDrawings.length / 3), 2 * parseInt(memberDrawings.length / 3)).map((element) =>
                    <UserDrawing key={element.id} drawing={element} clickDelete={clickDelete} clickScrap={clickScrap} openDetailModal={openDetailModal} openLoginAlert={openLoginAlert} />
                  )
                }
              </div>

              <div id="drawingBox3">
                {
                  memberDrawings.slice(0, parseInt(memberDrawings.length / 3)).map((element) =>
                    <UserDrawing key={element.id} drawing={element} clickDelete={clickDelete} clickScrap={clickScrap} openDetailModal={openDetailModal} openLoginAlert={openLoginAlert} />
                  )
                }
              </div>
            </>
          }
        </div>

        {loginAlertExpanded && <LoginAlert handleLoginAlertClose={handleLoginAlertClose} />}

        <Outlet context={outletContext} />
      </div>
    </>
  );
}

export default UserPage;
