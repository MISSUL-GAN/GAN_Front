import React, { useEffect, useState }  from "react";
import Navigation from "../components/Navigation";
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import './CreateDrawing.css';

function CreateDrawing() {
    var selectedStyle = "반고흐";

    const dispatch = useDispatch();
    const code = useSelector( (state) => state );
    const [img, setImg] = useState('');
    const [files, setFiles] = useState('');

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
    
    const onSubmitImg = () => {
        const formData = new FormData();
        let today = new Date();
        let time = today.getFullYear() + " " + (today.getMonth() + 1) + " " + today.getDate() + " " + today.getHours() + ":" + today.getMinutes();
        formData.append('uploadKey', files[0]);

        const config = {
            Headers: {
                'content-type': 'multipart/form-data',
            },
        };

        console.log(`사용자 : ${code}`);
        console.log('생성시간 : ' + time);
        console.log('원본 : ' + files[0]);
        console.log('화풍 : ' + selectedStyle);

        document.getElementById("style-modal").style.display = "none";
        axios.post('서버api주소', formData, config);
    }
    
    const clickChange = () => {
        const modal = document.getElementById("style-modal");
        modal.style.display = "flex";
    }

    const clickStyle = (e) => {
        selectedStyle = e.target.value;
    }

    const clickClose = () => {
        const modal = document.getElementById("style-modal");
        modal.style.display = "none";
      }

    return(
        <>
        <Navigation/>
        
        <div className="page-content">

            <div className="originImage"> 
                <div> 변환하고 싶은 사진을 넣어주세요 </div> 
                <img src={img} height={300} alt=''/>
                <form>
                    <input type='file' accept='image/*' onChange = {onUploadImg}/>
                </form>
            </div>
        
            <div className="optionBox">
                <div className="selectText"> <p> 원하는 화풍을 선택해주세요 </p> </div>
                
                <form className="styles">
                    <input type="radio" name="styles" value="반고흐" onClick={clickStyle} defaultChecked="checked"/> 반 고흐
                    <input type="radio" name="styles" value="클로드모네" onClick={clickStyle}/> 클로드 모네
                    <input type="radio" name="styles" value="폴세잔" onClick={clickStyle}/> 폴 세잔
                </form>
                
                <input type='file' accept='image/*' onChange = {onUploadImg}/><br/>
                
                <p> 선정적이거나 부적절한 문구 및 사진, 저작권에 위배되는 콘텐츠로 인해 발생하는 불이익에 대한 책임은 본인에게 있습니다. </p>

                <button onClick={clickChange}> 변환하기 </button>
            </div>


            <div id="style-modal" className="modal-overlay"> 
                <div className="modal-window">
                    <div className="title">
                        <span className="style-close" onClick={clickClose}> 닫기 </span><br/>
                    </div>

                    <div className="content">

                    </div>

                    <button className="style-submit" onClick={onSubmitImg}> 선택한 화풍으로 변환하기 </button>
                </div>    
            </div>
        </div>

        </>
    );
}

export default CreateDrawing;