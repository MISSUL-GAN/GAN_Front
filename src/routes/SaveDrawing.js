import { CircularProgress, Grid, Grow, styled, TextField, Tooltip, tooltipClasses } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import KakaoImageShareButton from "../components/KakaoImageShareButton"
import './SaveDrawing.css';
import { addDrawing } from '../api/drawingApi';
import Tags from "../components/Tags";
import { downloadImage } from '../util/downloadImage';
import ModalElement from "../components/ModalElement";

const STYLES = [
    { name: "반 고흐", tagId: 8 },
    { name: "클로드 모네", tagId: 9 },
    { name: "폴 세잔", tagId: 10 },
    { name: "우키요에", tagId: 11 },
];

const TAGS = [
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
Object.freeze(STYLES);
Object.freeze(TAGS);

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
        fontFamily: 'Spoqa Han Sans Neo',
        fontWeight: 500,
        fontSize: "14px",
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

    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const imageLoaded = () => setIsImageLoaded(true);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [walletAddress, setWalletAddress] = useState(null);
    const changeTitle = (e) => setTitle(e.target.value);
    const changeDescription = (e) => setDescription(e.target.value);
    const changeWalletAddress = (e) => setWalletAddress(e.target.value);

    const [modalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const [tagIds, setTagIds] = useState([]);
    const tagChanged = (e) => {
        const isAdding = e.target.checked;
        const tagId = e.target.value;
        if (isAdding) {
            if (tagIds.length < 4) {
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

    const drawing = { title, description, fileName, walletAddress };

    const download = async () => {
        try {
            downloadImage(fileName);
        }
        catch (e) {
            openAlert("이미지 다운로드 실패");
        }
    }

    const isReady = () => !isLoading && fileName && title && tagIds.length && description.length;

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
            openAlert("변환 오류");
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
                        <Grow in={!isImageLoaded}><CircularProgress className="progress-bar" color="inherit" /></Grow>
                        <Grow in={isImageLoaded}><img src={`https://ipfs.io/ipfs/${fileName}`} onLoad={imageLoaded} alt=""></img></Grow>
                    </div>
                </Grid>

                <Grid item container xs={12} md={6} justifyContent="center" alignItems="center" rowSpacing={2} maxHeight="740px">
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
                    <Grid item>
                        <div className="tag-box">
                            <p> 태그를 선택해주세요. (고정태그 포함 최대 4개) </p>
                            <hr />
                            {STYLES
                                .filter(style => style.tagId == presetTagId)
                                .map(style =>
                                    <label key={style.tagId}>
                                        <input name="tagBox" type="checkbox" value={style.tagId} disabled checked />
                                        <div className="style">{style.name}</div>
                                    </label>
                                )
                            }
                            <Tags tags={TAGS} tagChanged={tagChanged} />
                        </div>
                    </Grid>
                    <Grid item alignSelf="end" flexGrow="1" flexDirection="column" display="flex" gap="14px">
                        <div className="ethereum-wallet-box">
                            <NFTTooltip
                                title={
                                    <React.Fragment>
                                        이더리움 지갑 생성 방법을 알아보아요!
                                    </React.Fragment>
                                }
                                className="NFTButton"
                            >
                                <div className="question-button" onClick={openModal}>
                                    <p>?</p>
                                </div>
                            </NFTTooltip>
                            <input className="ethereum-wallet-address" placeholder="이더리움 지갑 주소를 입력할 경우, 해당 작품의 NFT가 발행됩니다." onChange={changeWalletAddress} />
                            <ModalElement open={modalOpen} handleClose={closeModal}>
                                <h2>지갑 주소 발행</h2>
                                <img src="https://ipfs.io/ipfs/bafkreidnafgvrfv4v3cluml6fjvybv2aqvffly52u4wcnoeaqm3bvmrb54" alt="" />
                                <h5>어쩌구 어쩌고 하면 됩니다</h5>
                                <h2>발행된 NFT 찾기</h2>
                                <img src="https://ipfs.io/ipfs/bafkreidnafgvrfv4v3cluml6fjvybv2aqvffly52u4wcnoeaqm3bvmrb54" alt="" />
                                <h5>어쩌구 어쩌고 하면 됩니다</h5>
                            </ModalElement>
                        </div>
                        <div className="button-box">
                            <button onClick={download}> <img src="/img/downloadIcon.png" width="60px" alt="" /> </button>
                            <KakaoImageShareButton drawing={drawing}></KakaoImageShareButton>
                            <button className="post-button" disabled={!isReady()} onClick={save}> Missul;GAN에 사진 게시하기 </button>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </Grow>
    );
}

export default SaveDrawing;