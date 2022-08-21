import { Grid, Grow } from "@mui/material";
import React, { useState, useRef } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import './CreateDrawing.css';

function CreateDrawing() {
    const navigate = useNavigate();
    const navigateToSave = () => navigate('save');

    const originImage = useRef();
    const styleImage = useRef();
    const styleForm = useRef();
    const cnnRadio = useRef();

    const [isAgreed, setIsAgreed] = useState(false);
    const [isGANDisabled, setIsGANDisabled] = useState(false);

    const [originImageFile, setOriginImageFile] = useState(null);
    const [originImageSrc, setOriginImageSrc] = useState(null);
    const [styleImageFile, setStyleImageFile] = useState(null);

    const { convert } = useOutletContext();
    const convertImage = () => {
        convert(originImageFile, styleImageFile, style);
        navigateToSave();
    }

    const [style, setStyle] = useState(null);
    const styles = [
        { name: "반 고흐", tagId: 8 },
        { name: "클로드 모네", tagId: 9 },
        { name: "폴 세잔", tagId: 10 },
        { name: "우키요에", tagId: 11 },
    ];
    const lookForOriginImage = () => originImage.current.click();
    const lookForStyleImage = (e) => { styleImage.current.click(); e.preventDefault() }

    const originImageChanged = () => {
        if (originImage.current.files.length > 0) {
            setOriginImageFile(originImage.current.files[0]);
            const reader = new FileReader();
            reader.onload = () => (setOriginImageSrc(reader.result));
            reader.readAsDataURL(originImage.current.files[0]);
        }
    }
    const styleImageChanged = () => {
        if (styleImage.current.files.length > 0) {
            disableStyleBox();
            cnnRadio.current.checked = true;
            setStyleImageFile(styleImage.current.files[0]);
        }
    }

    const disableStyleBox = () => setIsGANDisabled(true);
    const enableStyleBox = () => setIsGANDisabled(false);

    const clearStyle = () => {
        setStyle(null);
        enableStyleBox();
    }

    const selectStyle = () => setStyle(styleForm.current.style.value);

    const isReady = () => isAgreed && originImageFile && style && ((style !== 'cnn') || (style === 'cnn' && styleImageFile));

    return (
        <Grow direction="left" in mountOnEnter unmountOnExit>
            <Grid container spacing={4} sx={{ mt: 1 }}>
                <Grid item xs={12} md={6}>
                    <div className="uploadImage">
                        {!originImageSrc ?
                            <p> 변환하고 싶은<br />사진 및 그림을 넣어주세요 </p>
                            :
                            <div>
                                <img src={originImageSrc} alt=""></img>
                            </div>
                        }
                        <button className="uploadOriginImg" onClick={lookForOriginImage}> 파일에서 찾아보기 </button>
                        <input type='file' accept='image/*' style={{ display: "none" }} ref={originImage} onChange={originImageChanged} />
                    </div>
                </Grid>
                <Grid item container xs={12} md={6} justifyContent="center" alignItems="center" rowSpacing={4}>
                    <Grid item>
                        <div className="create-option">
                            <p> 원하는 화풍을 선택해주세요 </p>

                            <form ref={styleForm} onChange={selectStyle} onSubmit={e => e.preventDefault()}>
                                <div className="styles">
                                    {styles.map(style =>
                                        <label key={style.tagId}>
                                            <input type="radio" value={style.tagId} name="style" disabled={isGANDisabled} />
                                            <div className="styleButton">{style.name}</div>
                                        </label>
                                    )}
                                </div>

                                <div className="styleImage">
                                    <label>
                                        <input type="radio" value="cnn" name="style" ref={cnnRadio} />
                                        <div className="styleButton" onClick={lookForStyleImage}>원하는 화풍 사진 직접 첨부하기</div>
                                        <input type='file' accept='image/*' style={{ display: "none" }} ref={styleImage} onChange={styleImageChanged} />
                                    </label>
                                    <label>
                                        <input type="reset" />
                                        <div className="styleButton" onClick={clearStyle}>지우기</div>
                                    </label>
                                </div>
                            </form>
                        </div>
                    </Grid>

                    <Grid item>
                        <div className="create-warning" style={{ display: "flex" }}>
                            <div>
                                <input type="checkbox" id="create-warning" onChange={(e) => { setIsAgreed(e.target.checked) }} />
                            </div>
                            <div className="create-warning-text">
                                선정적이거나 부적절한 문구 및 사진, 저작권에 위배되는 콘텐츠로 인해 발생하는 불이익에 대한 책임은 본인에게 있습니다.
                            </div>
                        </div>

                        <button className="submitButton" disabled={!isReady()} onClick={convertImage}> 변환하기 </button>
                    </Grid>
                </Grid>
            </Grid>
        </Grow>
    );
}

export default CreateDrawing;