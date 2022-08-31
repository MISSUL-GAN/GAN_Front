import React from "react";
import ModalElement from "./ModalElement";
import detectEthereumProvider from '@metamask/detect-provider';
import style from 'styled-components';
import { useNavigate, useOutletContext } from "react-router-dom";

const ShadowImage = style.img`
    box-shadow: 4px 4px 10px 4px rgb(0 0 0 / 15%);
    margin-top: 10px;
    margin-bottom: 20px;
`;

const Number = style.div`
    background-color: #3C6B50;
    border-radius: 50%;
    text-align: center;
    color: white;
    font-weight: 600;

    width: 24px;
    height: 24px;
    display: inline-block;
    margin-right: 10px;
`;

const Instruction = style.div`
    margin-bottom: 5px;
    margin-left: 20px;
`;

const Step = style.div`
    margin: 20px 0;
`;

const H2WithLogo = style.h3`
    display: flex;
    align-items: center;
    gap: 10px;

    & img {
        height: 36px;
    }
`;

const Button = style.button`
    background-color: #3C6B50;
    color: white;
    padding: 8px 20px;
    border-radius: 10px;
    margin-right: 5px;

    &:hover {
        -webkit-filter: brightness(90%);
        filter: brightness(90%);
        -webkit-transition: all 250ms ease;
        -moz-transition: all 250ms ease;
        -o-transition: all 250ms ease;
        -ms-transition: all 250ms ease;
        transition: all 250ms ease;
    }
`;

const WalletHelpModal = () => {
    const { openAlert } = useOutletContext();

    const navigate = useNavigate();
    const handleClose = () => navigate('..');

    const addNetwork = async () => {
        try {
            const provider = await detectEthereumProvider();
            await provider.request({
                method: 'wallet_addEthereumChain',
                params: [{
                    chainId: '0x89',
                    chainName: 'Polygon Mainnet',
                    nativeCurrency: {
                        name: 'MATIC',
                        symbol: 'MATIC',
                        decimals: 18
                    },
                    rpcUrls: ['https://polygon-rpc.com'],
                    blockExplorerUrls: ['https://polygonscan.com']
                }]
            });
        }
        catch (e) {
            if (e instanceof TypeError) {
                openAlert('MetaMask를 설치하세요');
                return false;
            }
            else {
                openAlert('MetaMask에서 승인해주세요');
            }
        }
    };

    return (
        <ModalElement handleClose={handleClose}>
            <h1>지갑 만들기</h1>
            <Step>
                <H2WithLogo>
                    <img src="/img/metamask.png" alt="" />
                    MetaMask 설치
                </H2WithLogo>
                <ShadowImage src="/img/Metamask-install.gif" alt="" width="100%" />
                <Instruction>
                    <Number>1</Number>
                    <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn" target="_blank" rel="noreferrer">MetaMask 크롬 확장 프로그램</a>을 설치해주세요
                </Instruction>
            </Step>
            <Step>
                <H2WithLogo>
                    <img src="/img/eth-diamond-black.png" alt="" />
                    Ethereum 지갑 생성
                </H2WithLogo>
                <ShadowImage src="/img/Metamask-make-wallet.gif" alt="" width="100%" />
                <Instruction><Number>1</Number><b>MetaMask</b>를 실행해주세요</Instruction>
                <Instruction><Number>2</Number><b>시작하기</b> 버튼을 클릭해주세요</Instruction>
                <Instruction><Number>3</Number><b>괜찮습니다</b> 버튼을 클릭해주세요</Instruction>
                <Instruction><Number>4</Number><b>지갑 생성</b> 버튼을 클릭해주세요</Instruction>
                <Instruction><Number>5</Number>비밀번호를 설정하고, 약관에 동의한 후 <b>생성</b>버튼을 클릭해주세요</Instruction>
                <Instruction><Number>6</Number>비밀 복구 질문을 <b>저장</b>해주세요</Instruction>
                <Instruction><Number>7</Number><b>새로고침</b> 해주세요. 변환된 작품은 <b>유지</b>됩니다</Instruction>
            </Step>
            <Step>
                <H2WithLogo>
                    <img src="/img/polygon.svg" alt="" />
                    폴리곤 네트워크 추가
                </H2WithLogo>
                <ShadowImage src="/img/Polygon-network-install.gif" alt="" width="100%" />
                <Instruction><Number>1</Number><Button onClick={addNetwork}>이곳</Button>을 눌러 폴리곤 네트워크를 추가해 주세요</Instruction>
            </Step>
            <hr />
            <h1>지갑 활용하기</h1>
            <H2WithLogo>
                <img src="/img/metamask.png" alt="" />
                내 지갑 입력
            </H2WithLogo>
            <ShadowImage src="/img/Wallet-input.gif" alt="" width="100%" />
            <Instruction><Number>!</Number>작품 변환 시 지갑을 선택할 수 있어요</Instruction>
            <hr />
        </ModalElement>
    );
};

export default WalletHelpModal;