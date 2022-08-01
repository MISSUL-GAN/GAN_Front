import React, { useEffect, useState }  from "react";
import Navigation from "../components/Navigation";
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import './CreateDrawing.css';

function CreateDrawing() {
    var selectedStyle = "화풍1";

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
                <img src={img} width={200} alt=''/>
                <form>
                    <input type='file' accept='image/*' onChange = {onUploadImg}/>
                </form>
            </div>
        
            <button onClick={clickChange}> ➡ 변환하기 </button>

            <div id="style-modal" className="modal-overlay"> 
                <div className="modal-window">
                    <div className="title">
                        <p> 원하는 화풍을 선택해주세요 </p>
                        <span className="style-close" onClick={clickClose}> 닫기 </span><br/>
                    </div>

                    <div className="content">
                        <form>
                            <img src="/img/logo.png" alt="" width={150}/><br/><input type="radio" name="styles" value="화풍1" onClick={clickStyle} defaultChecked="checked"/> 화풍 1 <br/>
                            <img src="/img/logo.png" alt="" width={150}/><br/><input type="radio" name="styles" value="화풍2" onClick={clickStyle}/> 화풍 2 <br/>
                            <img src="/img/logo.png" alt="" width={150}/><br/><input type="radio" name="styles" value="화풍3" onClick={clickStyle}/> 화풍 3
                        </form>

                        <button className="style-submit" onClick={onSubmitImg}> 선택한 화풍으로 변환하기 </button>
                    </div>
                </div>    
            </div>

        </div>

        </>
    );
}

export default CreateDrawing;