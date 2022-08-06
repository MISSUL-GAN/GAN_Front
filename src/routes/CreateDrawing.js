import React, { useEffect, useState, useRef }  from "react";
import Navigation from "../components/Navigation";
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import './CreateDrawing.css';

function CreateDrawing() {
    var selectedStyle = "";

    const dispatch = useDispatch();
    const code = useSelector( (state) => state );
    const [img, setImg] = useState('');
    const [files, setFiles] = useState('');
    const [result, setResult] = useState(false);
    const subImg = useRef();

    useEffect(() => {
        dispatch({ type: '로그인'})
    }, []);

    const onUploadImg = (e) => {
        const file = e.target.files;
        setFiles(file);

        const reader = new FileReader();
        reader.onload = () => ( setImg(reader.result) );
        reader.readAsDataURL(file[0]);
    }
    
    const onUploadSubImg = () => {
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
        if(selectedStyle === e.target.value){
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

            selectedStyle = "";
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

            selectedStyle = e.target.value;
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

        if(files[0] === undefined) refusal = "원본 사진 업로드 안 하셨네요";
        else if(selectedStyle === "" && subImg.current.value === "") refusal = "화풍 선택 안해놓고 서브 이미지도 안 올림";
        else if(!(document.getElementById("warning").checked)) refusal = "주의사항 안 읽음 괘씸죄 추가";
        else flag = true;

        if(flag){
            const formData = new FormData();
            let today = new Date();
            let time = today.getFullYear() + " " + (today.getMonth() + 1) + " " + today.getDate() + " " + today.getHours() + ":" + today.getMinutes();
            formData.append('uploadKey', files[0]);
    
            const config = {
                Headers: {
                    'content-type': 'multipart/form-data',
                },
            };
    
            console.log(`사용자 : ${code}` + "\n" + '생성시간 : ' + time + " \n" + '원본 : ' + files[0] + "\n" + '화풍 : ' + selectedStyle);
    
            axios.post('서버api주소', formData, config);
            document.getElementsByClassName("uploadOriginImg")[0].style.display = "none";
            setResult(true);
        }

        else 
            alert(refusal);
    }
    
    const clickWarning = () => {
        if(img !== '' && ((selectedStyle !== "" && subImg.current.value === "") || (selectedStyle === "" && subImg.current.value !== ""))){
            if(document.getElementById("warning").checked)
                document.getElementsByClassName("submitButton")[0].style.opacity = "100%";
            
            else
                document.getElementsByClassName("submitButton")[0].style.opacity = "50%";
        }
    }

    const checkTag = () => {
        const tagBox = document.getElementsByName("tagBox");
        var count = 0;

        for(var i = 0 ; i < 11 ; i++){
            if(tagBox[i].checked)
                count++;
            
            if(count > 3){
                alert("태그는 3개까지만 선택할 수 있습니다.");
                tagBox[i].checked = false;
                count--;
                break;
            }
        }
    }

    const clickPost = () => {
        if(document.getElementsByClassName("titleBox")[0].value === "")
            alert("작품명은 필수적으로 입력해야합니다.");
        else {
            console.log("제목 : " + document.getElementsByClassName("titleBox")[0].value);
            console.log("설명 : " + document.getElementsByClassName("descriptionBox")[0].value);

            const tagBox = document.getElementsByName("tagBox");
            tagBox.forEach(tag => { if(tag.checked) console.log(tag.value); });
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
                        <button className="styleButton" name='styleButton' id="1" value="반고흐" onClick={clickStyle}> 반 고흐 </button>
                        <button className="styleButton" name='styleButton' id="2" value="클로드모네" onClick={clickStyle}> 클로드 모네 </button>
                        <button className="styleButton" name='styleButton' id="3" value="폴세잔" onClick={clickStyle}> 폴 세잔 </button> <br/>
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
                    <div> 태그를 선택해주세요. (최대 3개) </div>
                    <hr/>
                    <form onClick={checkTag}>
                        <input name="tagBox" type="checkbox" value="어두운"/>어두운&nbsp;&nbsp;
                        <input name="tagBox" type="checkbox" value="화사한"/>화사한&nbsp;&nbsp;
                        <input name="tagBox" type="checkbox" value="다채로운"/>다채로운&nbsp;&nbsp;
                        <input name="tagBox" type="checkbox" value="차분한"/>차분한&nbsp;&nbsp;
                        <input name="tagBox" type="checkbox" value="강랼한"/>강랼한<br/>
                    
                        <input name="tagBox" type="checkbox" value="차가운"/>차가운&nbsp;&nbsp;
                        <input name="tagBox" type="checkbox" value="따뜻한"/>따뜻한&nbsp;&nbsp;
                        <input name="tagBox" type="checkbox" value="풍경"/>풍경&nbsp;&nbsp;
                        <input name="tagBox" type="checkbox" value="동물"/>동물&nbsp;&nbsp;
                        <input name="tagBox" type="checkbox" value="인물"/>인물&nbsp;&nbsp;
                        <input name="tagBox" type="checkbox" value="기타"/>기타<br/>
                    </form>

                    <br/><br/>
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