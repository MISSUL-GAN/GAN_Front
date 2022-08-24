import React, { useState } from "react";
import './Home.css';
import { Outlet } from "react-router-dom";
import Tags from "../components/Tags";
import { Container } from "@mui/system";
import Sorts from "../components/Sorts";
import DrawingContainer from "../components/DrawingContainer";

const Sort = {
  HEART: { name: "좋아요순", apiPath: "heart" },
  RECENT: { name: "최신순", apiPath: "recent" },
  RANDOM: { name: "랜덤순", apiPath: "random" },
};
Object.freeze(Sort);

const Tag = [
  { name: "어두운", tagId: 1 },
  { name: "화사한", tagId: 2 },
  { name: "다채로운", tagId: 3 },
  { name: "차분한", tagId: 4 },
  { name: "강렬한", tagId: 5 },
  { name: "차가운", tagId: 6 },
  { name: "따뜻한", tagId: 7 },
];
Object.freeze(Tag);

const Tag2 = [
  { name: "반 고흐", tagId: 8 },
  { name: "클로드 모네", tagId: 9 },
  { name: "폴 세잔", tagId: 10 },
  { name: "우키요에", tagId: 11 },
  { name: "풍경", tagId: 12 },
  { name: "동물", tagId: 13 },
  { name: "인물", tagId: 14 },
  { name: "기타", tagId: 15 },
];
Object.freeze(Tag2);

function Home() {
  const [sort, setSort] = useState(Sort.HEART.apiPath);
  const sortChanged = (e) => {
    const sort = e.currentTarget.value;
    setSort(sort);
  }

  const [tagFilter, setTagFilter] = useState([]);
  const tagChanged = (e) => {
    const isAdding = e.target.checked;
    const tagId = e.target.value;
    if (isAdding) {
      if (tagFilter.indexOf(tagId) === -1)
        setTagFilter([...tagFilter, tagId]);
    }
    else {
      setTagFilter(tagFilter.filter(id => id !== tagId));
    }
  }


  const outletContext = { home: true };
  return (
    <div className="homecontainer">
      <div className="tagOptionBox">
        <div> <img src="/img/textLogo.png" alt="" /> </div>
        <p className="tagGuide"> 필터를 통해 원하는 이미지를 찾아보세요 </p>
        <div className="tagBox">
          <Tags tags={Tag} tagChanged={tagChanged}></Tags>
        </div>
        <div className="tagBox">
          <Tags tags={Tag2} tagChanged={tagChanged}></Tags>
        </div>
      </div>

      <Container maxWidth="xl">
        <div className="viewOptionBox">
          <button className="refresh" onClick={() => setTagFilter(prev => [...prev])}> 이미지 새로고침 </button>
          <Sorts sorts={Sort} sortChanged={sortChanged} defaultSort={sort} />
        </div>
        <DrawingContainer sort={sort} tagFilter={tagFilter} />
      </Container>

      <Outlet context={outletContext} />
    </div>
  );
}

export default Home;