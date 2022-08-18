import React, { useState } from "react";
import Navigation from "../components/Navigation";
import { uploadImage } from '../api/imageApi';
import { getDrawings, addDrawing } from '../api/drawingApi';
import { getMember, getName, setName } from '../api/memberApi';

function ApiTestPage() {
    const [name2, setName2] = useState("바꿀이름");
    const [image, setImage] = useState();
    const [fileName, setFileName] = useState("bafkreiapdwp65rgye2f7isg4bg55mneudaouuuaugctw2qms2aqzr3eeii");
    const [title, setTitle] = useState("그림 제목 테스트");
    const [description, setDescription] = useState("그림 설명 테스트");
    const [tagIds, setTags] = useState([1, 2, 3]);
    return (
        <div>
            <Navigation />
            <div className="container">
                <div className="card" style={{ minHeight: "400px" }}>
                    <div className="card-body">
                        <h4 className="card-title">사용자 API</h4>
                        <h6 className="card-title">결과는 콘솔에</h6>

                    </div>

                    <div className="d-grid gap-2 col-6 mx-auto mb-4">
                        <button className="btn btn-primary" onClick={async () => { console.log(await getMember()) }}>getMember</button>
                        <button className="btn btn-primary" onClick={async () => { console.log(await getName()) }}>getName</button>
                        <div className="input-group">
                            <span className="input-group-text" id="basic-addon1">이름</span>
                            <input type="text" className="form-control" placeholder="제목" defaultValue={name2} onChange={e => setName2(e.currentTarget.value)} />
                        </div>
                        <button className="btn btn-primary" onClick={async () => { console.log(await setName(name2)) }}>setName</button>
                    </div>
                </div>
                <div className="card" style={{ minHeight: "400px" }}>
                    <div className="card-body">
                        <h4 className="card-title">이미지 API</h4>
                        <h6 className="card-title">결과는 콘솔에</h6>
                    </div>

                    <div className="d-grid gap-2 col-6 mx-auto mb-4">
                        <input className="form-control" type="file" id="formFile" onChange={(e) => setImage(e.target.files[0])}></input>
                        <button className="btn btn-primary" onClick={async () => { console.log(await uploadImage(image)) }}>uploadImage</button>
                    </div>
                </div>

                <div className="card" style={{ minHeight: "400px" }}>
                    <div className="card-body">
                        <h4 className="card-title">그림 추가 API</h4>
                        <h6 className="card-title">결과는 콘솔에</h6>
                    </div>

                    <div className="d-grid gap-2 col-6 mx-auto mb-4">
                        <div className="input-group">
                            <span className="input-group-text" id="basic-addon1">제목</span>
                            <input type="text" className="form-control" placeholder="제목" defaultValue={title} onChange={e => setTitle(e.currentTarget.value)} />
                        </div>
                        <div className="input-group">
                            <span className="input-group-text" id="basic-addon1">설명</span>
                            <input type="text" className="form-control" placeholder="설명" defaultValue={description} onChange={e => setDescription(e.currentTarget.value)} />
                        </div>
                        <div className="input-group">
                            <span className="input-group-text" id="basic-addon1">태그</span>
                            <input type="text" className="form-control" placeholder="태그" defaultValue={tagIds} onChange={e => setTags(e.currentTarget.value.split(","))} />
                        </div>
                        <div className="input-group">
                            <span className="input-group-text" id="basic-addon1">fileName</span>
                            <input type="text" className="form-control" placeholder="파일이름" defaultValue={fileName} onChange={e => setFileName(e.currentTarget.value)} />
                        </div>
                        <button className="btn btn-primary" onClick={async () => { console.log(await addDrawing({ title, description, tagIds, fileName })) }}>addDrawing</button>
                        <button className="btn btn-primary" onClick={async () => { console.log(await getDrawings()) }}>getDrawings(현재 사용자)</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ApiTestPage;