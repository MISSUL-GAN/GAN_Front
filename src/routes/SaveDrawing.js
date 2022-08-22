import { CircularProgress, Grid, Grow, styled, TextField, Tooltip, tooltipClasses } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import KakaoImageShareButton from "../components/KakaoImageShareButton"
import './SaveDrawing.css';
import { addDrawing } from '../api/drawingApi';


const NFTTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow placement="top-start" classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: "white",
        filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.15))"
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: 'white',
        color: 'rgba(0, 0, 0, 0.87)',
        padding: "12px 16px",
        maxWidth: 220,
        fontFamily: 'Spoqa Han Sans Neo',
        fontWeight: 500,
        fontSize: "12px",
        borderRadius: "8px",
        filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.15))"
    },
}));

const GreenTextField = styled(TextField)
    ({
        '& .MuiInput-underline:after': {
            borderBottomColor: '#3C6B50',
        },
        '& .MuiInputBase-input': {
            fontFamily: 'Spoqa Han Sans Neo',
            fontWeight: 400,
            fontSize: "24px",
            lineHeight: "40px"
        }
    });

function SaveDrawing() {
    const navigate = useNavigate();
    const navigateToMyPage = (drawingId) => navigate(`/myPage/${drawingId}`);
    
    const { isLoading, presetTagId, fileName, openAlert } = useOutletContext();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const changeTitle = (e) => setTitle(e.target.value);
    const changeDescription = (e) => setDescription(e.target.value);

    const [tagIds, setTagIds] = useState([]);
    const tagChanged = (e) => {
        const isAdding = e.target.checked;
        const tagId = e.target.value;
        if (isAdding) {
            if (tagIds.length < 3) {
                if (tagIds.indexOf(tagId) === -1)
                    setTagIds([...tagIds, tagId]);
                return true;
            }
            e.preventDefault();
            return;
        }
        else {
            setTagIds(tagIds.filter(id => id !== tagId));
            return true;
        }
    }

    const drawing = { title: title, description: description, fileName: fileName };

    const styles = [
        { name: "반 고흐", tagId: 8 },
        { name: "클로드 모네", tagId: 9 },
        { name: "폴 세잔", tagId: 10 },
        { name: "우키요에", tagId: 11 },
    ];

    const tags = [
        { name: "어두운", tagId: 1 },
        { name: "화사한", tagId: 2 },
        { name: "다채로운", tagId: 3 },
        { name: "차분한", tagId: 4 },
        { name: "강렬한", tagId: 5 },
        { name: "차가운", tagId: 6 },
        { name: "따뜻한", tagId: 7 },
        { name: "풍경", tagId: 12 },
        { name: "동물", tagId: 13 },
        { name: "인물", tagId: 14 },
        { name: "기타", tagId: 15 },
    ];

    const downloadImage = async (e) => {
        try {
            const imageUrl = `https://api.missulgan.art/image/${fileName}`;
            const response = await fetch(imageUrl, { method: 'GET' });
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);

            const tempElement = document.createElement('a');
            document.body.appendChild(tempElement);
            tempElement.href = url;
            tempElement.download = "missulgan";
            tempElement.click();
            tempElement.remove();
        }
        catch (e) {
            openAlert("이미지 다운로드 실패");
        }
    }

    const isReady = () => !isLoading && fileName && title && tagIds.length;

    const save = async () => {
        if (!isReady()) return false;
        drawing.tagIds = tagIds;
        try {
            const response = await addDrawing(drawing);
            navigateToMyPage(response.id)
        }
        catch {
            openAlert("게시 실패");
        }
    }

    useEffect(() => {
        const navigateToCreate = () => navigate("/create");
        if (!isLoading && !fileName) {
            openAlert("로딩 오류");
            navigateToCreate();
        }
        if (presetTagId)
            setTagIds([presetTagId]);
    }, [fileName, isLoading, navigate, openAlert, presetTagId]);

    return (
        <Grow in mountOnEnter unmountOnExit>
            <Grid container spacing={4} sx={{ mt: 1 }}>
                <Grid item xs={12} md={6}>
                    <div className="uploadImage">
                        <Grow in={!fileName}><CircularProgress className="progress-bar" color="inherit" /></Grow>
                        <img src={`https://api.missulgan.art/image/${fileName}`} alt=""></img>
                    </div>
                </Grid>

                <Grid item container xs={12} md={6} justifyContent="center" alignItems="center" rowSpacing={2}>
                    <Grid item alignSelf="start" className="create-option" flexDirection="column">
                        <GreenTextField
                            className="title"
                            placeholder="작품명을 입력해주세요. (20자 이내)"
                            variant="standard"
                            onChange={changeTitle}
                            value={title}
                        />
                        <GreenTextField
                            className="description"
                            multiline
                            rows={4}
                            placeholder="설명을 입력해주세요. (200자 이내)"
                            variant="standard"
                            onChange={changeDescription}
                            value={description}
                        />
                    </Grid>

                    <Grid item alignSelf="end">
                        <div className="tag-box">
                            <p> 태그를 선택해주세요. (최대 3개) </p>
                            <hr />
                            {styles
                                .filter(style => style.tagId == presetTagId)
                                .map(style =>
                                    <label key={style.tagId}>
                                        <input name="tagBox" type="checkbox" value={style.tagId} disabled checked />
                                        <div className="style">{style.name}</div>
                                    </label>
                                )}
                            {tags.map(tag =>
                                <label key={tag.tagId}>
                                    <input name="tagBox" type="checkbox" value={tag.tagId} onClick={tagChanged} />
                                    <div className="tag">{tag.name}</div>
                                </label>
                            )}
                        </div>
                        <div className="button-box">
                            <button onClick={downloadImage}> <img src="/img/downloadIcon.png" width="60px" alt="" /> </button>
                            <KakaoImageShareButton drawing={drawing}></KakaoImageShareButton>
                            <NFTTooltip
                                title={
                                    <React.Fragment>
                                        당신의 작품을 NFT로 등록해보세요!
                                    </React.Fragment>
                                }
                                className="NFTButton"
                            >
                                <button className="NFTButton"><img src="/img/openseaIcon.png" width="60px" alt="" /> </button>
                            </NFTTooltip>
                            <button className="post-button" disabled={!isReady()} onClick={save}> Missul;GAN에 사진 게시하기 </button>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </Grow>
    );
}

export default SaveDrawing;