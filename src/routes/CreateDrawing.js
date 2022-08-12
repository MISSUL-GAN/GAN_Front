import React, { useEffect, useState, useRef }  from "react";
import Navigation from "../components/Navigation";
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import './CreateDrawing.css';

function CreateDrawing() {

    const dispatch = useDispatch();
    const [img, setImg] = useState('');
    const [files, setFiles] = useState('');
    const [style, setStyle] = useState('');
    const [result, setResult] = useState(false);
    const subImg = useRef();

    const onUploadImg = (e) => {
        const file = e.target.files;
        setFiles(file);
        
        const reader = new FileReader();
        reader.onload = () => ( setImg(reader.result) );
        reader.readAsDataURL(file[0]);
    }
    
    const onUploadSubImg = (e) => {
        setFiles([...files, e.target.files[0]]);

        const styleButton = document.getElementsByName("styleButton");
        styleButton.forEach((b) => {
            b.style.backgroundColor = "#ced4da"; 
            b.style.color = "#868e96";
            b.disabled = true;
            b.style.cursor = "not-allowed";
        });

        document.getElementsByClassName("uploadSubImg")[0].style.background = "#3C6B50";
        document.getElementsByClassName("uploadSubImg")[0].style.color = "#F4F4F4";
    }

    const clickStyle = (e) => {
        if(style === e.target.value){
            document.getElementById(e.target.id).style.background = "#F4F4F4";
            document.getElementById(e.target.id).style.color = "#3C6B50";

            document.getElementById("subImg").disabled = false;
            document.getElementsByClassName("uploadSubImg")[0].style.background = "#F4F4F4";
            document.getElementsByClassName("uploadSubImg")[0].style.color = "#3C6B50";
            document.getElementsByClassName("uploadSubImg")[0].style.cursor = "pointer";

            document.getElementsByClassName("deleteSubImg")[0].disabled = false;
            document.getElementsByClassName("deleteSubImg")[0].style.background = "#F4F4F4";
            document.getElementsByClassName("deleteSubImg")[0].style.color = "#3C6B50";
            document.getElementsByClassName("deleteSubImg")[0].style.cursor = "pointer";

            setStyle('');
        }

        else {
            document.getElementById(e.target.id).style.background = "#3C6B50";
            document.getElementById(e.target.id).style.color = "#F4F4F4";

            let buttons = document.getElementsByName("styleButton");
            buttons.forEach((b) => {
                if(b.id !== e.target.id){
                    document.getElementById(b.id).style.background = "#F4F4F4";
                    document.getElementById(b.id).style.color = "#3C6B50";
                }
            });

            document.getElementById("subImg").disabled = true;
            document.getElementsByClassName("uploadSubImg")[0].style.background = "#ced4da"; 
            document.getElementsByClassName("uploadSubImg")[0].style.color = "#868e96";
            document.getElementsByClassName("uploadSubImg")[0].style.cursor = "not-allowed";

            document.getElementsByClassName("deleteSubImg")[0].disabled = true;
            document.getElementsByClassName("deleteSubImg")[0].style.background = "#ced4da"; 
            document.getElementsByClassName("deleteSubImg")[0].style.color = "#868e96";
            document.getElementsByClassName("deleteSubImg")[0].style.cursor = "not-allowed";

            setStyle(e.target.value);
        }
    }

    const clickDelete = () => {
        subImg.current.value = "";
        const styleButton = document.getElementsByName("styleButton");
        styleButton.forEach((b) => { 
            b.style.backgroundColor = "#F4F4F4";
            b.style.color = "#3C6B50";
            b.disabled = false;
            b.style.cursor = "pointer";
        });

        document.getElementsByClassName("uploadSubImg")[0].style.background = "#F4F4F4";
        document.getElementsByClassName("uploadSubImg")[0].style.color = "#3C6B50";
    }

    const onSubmitImg = () => {
        var flag = false;
        var refusal;

        if(files[0] === undefined) refusal = "변환하고 싶은 사진을 선택해주세요.";
        else if(style === "" && subImg.current.value === "") refusal = "화풍을 선택하거나, 원하는 화풍의 사진을 선택해주세요.";
        else if(!(document.getElementById("warning").checked)) refusal = "주의사항을 확인해주세요.";
        else flag = true;

        if(flag){
            const formData = new FormData();
            formData.append('uploadKey', files[0]);
    
            var item = {
                "convert_tag" : (style !== "") ? style : "cnn",
                "origin_img" : files[0],
                "style_img" : (subImg.current.value !== "") ? files[files.length-1] : null,
                "token" : "useSelector로 사용자 정보 가져오는거 추가하고 aToken 갖다 넣으면 됨"
            };

            console.log(item);
            //환곤이 서버로 보내는 코드 + fileName 리턴 받아서 저장하는 코드 추가하기
            document.getElementsByClassName("uploadOriginImg")[0].style.display = "none";
            setResult(true);
        }

        else 
            alert(refusal);
    }
    
    const clickWarning = () => {
        if(img !== '' && ((style !== "" && subImg.current.value === "") || (style === "" && subImg.current.value !== ""))){
            if(document.getElementById("warning").checked)
                document.getElementsByClassName("submitButton")[0].style.opacity = "100%";
            
            else
                document.getElementsByClassName("submitButton")[0].style.opacity = "50%";
        }
    }

    const checkTag = (e) => {
        document.getElementById(e.target.className).checked = (document.getElementById(e.target.className).checked) ? false : true;

        if(document.getElementById(e.target.className).checked){
            document.getElementsByClassName(e.target.className)[0].style.backgroundColor = "#3C6B50";
            document.getElementsByClassName(e.target.className)[0].style.color = "#FFFFFF";
        }
        else {  
            document.getElementsByClassName(e.target.className)[0].style.backgroundColor = "#FFFFFF";
            document.getElementsByClassName(e.target.className)[0].style.color = "#3C6B50";
        }

        const tagBox = document.getElementsByName("tagBox");
        var count = 0;

        for(var i = 0 ; i < 11 ; i++){
            if(tagBox[i].checked) count++;
            if(count > 3){
                alert("태그는 3개까지만 선택할 수 있습니다.");
                tagBox[i].checked = false;
                document.getElementsByClassName(e.target.className)[0].style.backgroundColor = "#FFFFFF";
                document.getElementsByClassName(e.target.className)[0].style.color = "#3C6B50";
                count--;
                break;
            }
        }
    }

    const clickPost = () => {
        if(document.getElementsByClassName("titleBox")[0].value === "")
            alert("작품명은 필수적으로 입력해야합니다.");
        else {
            const tags = [];
            const tagBox = document.getElementsByName("tagBox");
            
            tagBox.forEach(tag => { 
                if(tag.checked) 
                    tags.push(parseInt(tag.id)); 
            });
            
            if(style !== null)
                tags.push(parseInt(style)); 

            var result = {
                "description": document.getElementsByClassName("descriptionBox")[0].value,
                "fileName": "환곤이한테 받은 fileName",
                "tagIds": tags,
                "title": document.getElementsByClassName("titleBox")[0].value
            };
            console.log(result);
        }
    }

    return(
        <>
        <Navigation/>

        <div className="logo"> <img src="/img/textLogo.png"/> </div>

        <div className="page-content">
            <div className="originBox">
                { img === '' ? <p> 변환하고 싶은<br/>사진 및 그림을 넣어주세요 </p> : <><img src={img} alt=''/><br/></> }
                <form>
                    <label className="uploadOriginImg" for="originImg"> 파일에서 찾아보기 </label>
                    <input type='file' id="originImg" accept='image/*' style={{display:"none"}} onChange = {onUploadImg}/>
                </form>
            </div>    

            <div className="emptyBox"/>

            { !result ?
                <div className="optionBox">
                    <p> 원하는 화풍을 선택해주세요 </p>
                    
                    <div id="styles">
                        <button className="styleButton" name='styleButton' id="8" value="8" onClick={clickStyle}> 반 고흐 </button>
                        <button className="styleButton" name='styleButton' id="9" value="9" onClick={clickStyle}> 클로드 모네 </button>
                        <button className="styleButton" name='styleButton' id="10" value="10" onClick={clickStyle}> 폴 세잔 </button>
                        <button className="styleButton" name='styleButton' id="11" value="11" onClick={clickStyle}> 우키요에 </button> <br/>
                    </div>
                    
                    <div className="subImgBox">
                        <label className="uploadSubImg" for="subImg"> 원하는 화풍 사진 직접 첨부하기 </label>
                        <input type='file' accept='image/*' id="subImg" ref={subImg} style={{display:"none"}} onChange = {onUploadSubImg}/><br/>
                        <button className="deleteSubImg" onClick={clickDelete}> 지우기 </button>
                    </div>
                    
                    <div className="emptyBox"/>

                    <div className="warning">
                        <input type="checkbox" id="warning" onChange={clickWarning}/>&nbsp;
                        선정적이거나 부적절한 문구 및 사진, 저작권에 위배되는 콘텐츠로 인해 발생하는 불이익에 대한 책임은 본인에게 있습니다.<br/><br/>
                    </div>
                    
                    <button className="submitButton" onClick={onSubmitImg}> 변환하기 </button>
                </div>
            :
                <div className="resultBox">
                    <br/><br/><br/>
                    <input type="text" className="titleBox" maxLength={20} placeholder="* 작품명을 입력해주세요. (20자 이내)"/>
                    <hr/>
                    <textarea className="descriptionBox" maxLength={200} placeholder="설명을 입력해주세요. (200자 이내)"/>
                    
                    <br/><br/>
                    <div className="tagBox">
                        <div> 태그를 선택해주세요. (최대 3개) </div><hr/>

                        <button className="1" onClick={checkTag}> <input id="1" name="tagBox" type="checkbox" value="어두운"/> 어두운 </button>
                        <button className="2" onClick={checkTag}> <input id="2" name="tagBox" type="checkbox" value="화사한"/> 화사한 </button>
                        <button className="3" onClick={checkTag}> <input id="3" name="tagBox" type="checkbox" value="다채로운"/> 다채로운 </button>
                        <button className="4" onClick={checkTag}> <input id="4" name="tagBox" type="checkbox" value="차분한"/> 차분한 </button>
                        <button className="5" onClick={checkTag}> <input id="5" name="tagBox" type="checkbox" value="강렬한"/> 강렬한 </button><br/><br/>

                        <button className="6" onClick={checkTag}> <input id="6" name="tagBox" type="checkbox" value="차가운"/> 차가운 </button>
                        <button className="7" onClick={checkTag}> <input id="7" name="tagBox" type="checkbox" value="따뜻한"/> 따뜻한 </button>
                        <button className="12" onClick={checkTag}> <input id="12" name="tagBox" type="checkbox" value="풍경"/> 풍경 </button>
                        <button className="13" onClick={checkTag}> <input id="13" name="tagBox" type="checkbox" value="동물"/> 동물 </button>
                        <button className="14" onClick={checkTag}> <input id="14" name="tagBox" type="checkbox" value="인물"/> 인물 </button>
                        <button className="15" onClick={checkTag}> <input id="15" name="tagBox" type="checkbox" value="기타"/> 기타 </button>
                    </div>

                    <br/>
                    <div className="buttonBox">
                        <button> <a href="/img/logo.png" download> <img src="/img/downloadIcon.png" width="60px"/> </a> </button>
                        <button> <img src="/img/kakaoIcon.png" width="60px"/> </button>
                        <button className="NFTButton" title="OpenSea에 방금 만든 사진을 NFT로 등록해보세요!"> <img src="/img/openseaIcon.png" width="60px"/> </button>
                        <button className="postButton" onClick={clickPost}> Missul;GAN에 사진 게시하기 </button>
                   </div>
                </div>    
            }

        </div>

        </>
    );
}

export default CreateDrawing;