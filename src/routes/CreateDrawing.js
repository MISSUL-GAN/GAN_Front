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
    
    const onUploadSubImg = (e) => {
        const radioButton = document.getElementsByName("styles");
        radioButton[0].disabled = true;
        radioButton[1].disabled = true;
        radioButton[2].disabled = true;
    }

    const clickStyle = (e) => {
        if(selectedStyle === e.target.value){
            document.getElementById(e.target.value).checked = false;
            document.getElementById("subImg").disabled = false;
            document.getElementsByClassName("deleteSubImg")[0].disabled = false;
            selectedStyle = "";
        }
            
        else {
            document.getElementById("subImg").disabled = true;
            document.getElementsByClassName("deleteSubImg")[0].disabled = true;
            selectedStyle = e.target.value;
        }
    }

    const clickDelete = () => {
        subImg.current.value = "";
        const radioButton = document.getElementsByName("styles");
        radioButton[0].disabled = false;
        radioButton[1].disabled = false;
        radioButton[2].disabled = false;
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
            document.getElementById("originImg").disabled = true;
            setResult(true);
        }

        else 
            alert(refusal);
    }
    
    const checkTag = () => {
        const tagBox = document.getElementsByName("tagBox");
        var count = 0;

        for(var i = 0 ; i < 11 ; i++){
            if(count > 3){
                alert("태그는 3개까지만 선택할 수 있습니다.");
                tagBox[i-1].checked = false;
                count--;
                break;
            }
            if(tagBox[i].checked)
                count++;
        }
    }

    return(
        <>
        <Navigation/>
        
        <div className="page-content">

            <div className="originImage"> 
                <img src={img} height={470} alt=''/>
                <form>
                    <input type='file' id="originImg" accept='image/*' onChange = {onUploadImg}/>
                </form>
            </div>

            <div className="emptyBox"/>

            { !result ?
                <div className="optionBox">
                    <div> 원하는 화풍을 선택해주세요 </div>
                    
                    <form id="styles">
                        <input type="radio" name="styles" id="반고흐" value="반고흐" onClick={clickStyle}/> 반 고흐
                        <input type="radio" name="styles" id="클로드모네" value="클로드모네" onClick={clickStyle}/> 클로드 모네
                        <input type="radio" name="styles" id="폴세잔" value="폴세잔" onClick={clickStyle}/> 폴 세잔
                    </form>
                    
                    <div className="subImgBox">
                        <input type='file' accept='image/*' id="subImg" ref={subImg} onChange = {onUploadSubImg}/><br/>
                        <button className="deleteSubImg" onClick={clickDelete}> 지우기 </button>
                    </div>
                    
                    <input type="checkbox" id="warning"/> 선정적이거나 부적절한 문구 및 사진, 저작권에 위배되는 콘텐츠로 인해 발생하는 불이익에 대한 책임은 본인에게 있습니다. <br/>
            
                    <button onClick={onSubmitImg}> 변환하기 </button>
                </div>
            :
                <div className="resultBox">
                    <p> 변환된 사진 받고나면 뜨는 영역 </p>
                    
                    <br/>
                    <input type="text" className="titleBox" maxLength={20} placeholder="작품명을 입력해주세요. (20자 이내)"/><br/><br/>
                    <textarea className="descriptionBox" maxLength={200} placeholder="설명을 입력해주세요. (200자 이내)"/>
                    
                    <div> 태그를 선택해주세요. (최대 3개) </div>
                    <form onClick={checkTag}>
                        <input name="tagBox" type="checkbox"/>어두운
                        <input name="tagBox" type="checkbox"/>화사한
                        <input name="tagBox" type="checkbox"/>다채로운
                        <input name="tagBox" type="checkbox"/>차분한
                        <input name="tagBox" type="checkbox"/>강랼한<br/>
                    
                        <input name="tagBox" type="checkbox"/>차가운
                        <input name="tagBox" type="checkbox"/>따뜻한
                        <input name="tagBox" type="checkbox"/>풍경
                        <input name="tagBox" type="checkbox"/>동물
                        <input name="tagBox" type="checkbox"/>인물
                        <input name="tagBox" type="checkbox"/>기타<br/>
                    </form>

                    
                    <div className="buttonBox">
                        <button> 다운로드 </button>
                        <button> 카톡 공유 </button>
                        <button> OpenSea </button>
                        <button> Missul;GAN에 사진 게시하기 </button>
                   </div>
                </div>    
            }

        </div>

        </>
    );
}

export default CreateDrawing;