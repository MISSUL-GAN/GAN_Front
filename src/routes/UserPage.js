import React, { useEffect, useState, useRef } from "react";
import UserDrawing from "./UserDrawing";
import { scrap, unscrap } from "../api/scrapApi";
import { getMemberDrawings } from "../api/drawingApi";
import { getMemberInfo } from "../api/memberApi";
import LoginAlert from "../components/LoginAlert";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import './UserPage.css';

function UserPage() {
  const { memberId } = useParams();
  const [memberDrawings, setMemberDrawings] = useState([]);

  const profileImgRef = useRef();
  const nameRef = useRef();

  const navigate = useNavigate();

  const openDetailModal = (drawing) => { navigate(`${drawing.id}`) }

  const [loginAlertExpanded, setLoginAlertExpanded] = useState(false);
  const handleLoginAlertClose = () => setLoginAlertExpanded(false);
  const openLoginAlert = () => { setLoginAlertExpanded(true); }

  useEffect(() => {
    async function getUserPageContent() {
      const member = await getMemberInfo(memberId);
      profileImgRef.current = member.profileImage;
      nameRef.current = member.name;

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

  return (
    <>
      <div id="page-content">
        <div> <img src={profileImgRef.current} alt="" /> </div>
        <div> {nameRef.current} </div>
        <hr />

        <div id="drawing-container">
          <div id="drawingBox1">
            {
              memberDrawings.slice(0, parseInt(memberDrawings.length / 3)).map((element) =>
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
              memberDrawings.slice(2 * parseInt(memberDrawings.length / 3),).map((element) =>
                <UserDrawing key={element.id} drawing={element} clickDelete={clickDelete} clickScrap={clickScrap} openDetailModal={openDetailModal} openLoginAlert={openLoginAlert} />
              )
            }
          </div>
        </div>

        {loginAlertExpanded && <LoginAlert handleLoginAlertClose={handleLoginAlertClose} />}

        <Outlet />
      </div>
    </>
  );
}

export default UserPage;
