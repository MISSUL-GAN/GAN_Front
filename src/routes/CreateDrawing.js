import React, { useEffect, useState }  from "react";
import Navigation from "../components/Navigation";
import { useDispatch } from 'react-redux';
import axios from "axios";

function CreateDrawing() {
    const dispatch = useDispatch();
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
    
    const onSubmitImg = (e) => {
        const formData = new FormData();
        formData.append('uploadKey', files[0]);

        const config = {
            Headers: {
                'content-type': 'multipart/form-data',
            },
        };

        axios.post('서버api주소', formData, config);
        console.log("서버에 이미지 전달");
    }
    
    return(
        <>
        <Navigation/>
        <div> 사진을 새로운 그림체로 바꿔보세요.... </div>
        
        <br/>
        <div> 현재 선택한 이미지 </div>
        <img src={img} width={150} alt=''/>
        
        <br/><br/>
        <form>
            <input type='file' accept='image/*' onChange = { onUploadImg }/>
        </form>

        <br/><br/>
        <div> 화풍 선택하기.. 이거 스타일 컴포넌트 모달 쓰고 싶음 </div>

        <br/>
        { img != '' && <button onClick={ onSubmitImg }> 사진 변환하기 </button> }
        </>
    );
}

export default CreateDrawing;