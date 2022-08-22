import React, { useEffect, useState } from "react";
import UserDrawing from "./UserDrawing";
import { scrap, unscrap } from "../api/scrapApi";
import { getMemberDrawings } from "../api/drawingApi";
import DetailModal from "./DetailModal";
import LoginAlert from "../components/LoginAlert";
import './UserPage.css';

function UserPage() {
  const member = {
    nick: new URL(window.location.href).searchParams.get("member"),
    img: new URL(window.location.href).searchParams.get("img"),
    id: parseInt(new URL(window.location.href).searchParams.get("id")) 
  };

  const [memberDrawings, setMemberDrawings] = useState([]);

  const [target, setTarget] = useState();
  const [detailModalExpanded, setDetailModalExpanded] = useState(false);
  const handleDetailModalClose = () => { setDetailModalExpanded(false) };
  const openDetailModal = (drawing) => { setTarget(drawing); setDetailModalExpanded(true); }

  const [loginAlertExpanded, setLoginAlertExpanded] = useState(false);
  const handleLoginAlertClose = () => setLoginAlertExpanded(false);
  const openLoginAlert = () => { setLoginAlertExpanded(true); }

  useEffect(() => {
    async function getUserDrawings() {
      setMemberDrawings(await getMemberDrawings(member.id));
    }

    getUserDrawings();
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
        <div> <img src={member.img} alt="" /> </div>
        <div> {member.nick} </div>
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

        {detailModalExpanded && <DetailModal drawing={target} handleDetailModalClose={handleDetailModalClose} openLoginAlert={openLoginAlert} />}

        {loginAlertExpanded && <LoginAlert handleLoginAlertClose={handleLoginAlertClose} />}
      </div>
    </>
  );
}

export default UserPage;
