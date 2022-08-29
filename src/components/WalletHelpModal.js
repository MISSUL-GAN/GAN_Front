import React from "react";
import ModalElement from "./ModalElement";
import detectEthereumProvider from '@metamask/detect-provider';
import style from 'styled-components';

const ShadowImage = style.img`
    box-shadow: 4px 4px 10px 4px rgb(0 0 0 / 15%);
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
`;

const Step = style.div`
    margin: 20px 0;
`;

const H2WithLogo = style.h2`
    display: flex;
    align-items: center;
    gap: 10px;

    & img {
        height: 36px;
    }
`;

const WalletHelpModal = ({ open, handleClose, openAlert }) => {

    const addNetwork = async () => {
        const provider = await detectEthereumProvider();

        if (!provider) {
            openAlert('MetaMask를 설치하세요');
            return false;
        }
        try {
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
        catch {
            openAlert('MetaMask 오류');
        }
    };

    return (
        <ModalElement open={open} handleClose={handleClose}>
            {/* <a onClick={addNetwork}>네트워크 추가</a> */}
            <h1>지갑 만들기</h1>
            <Step>
                <H2WithLogo>
                    <img src="/img/metamask.png" alt="" />
                    MetaMask 설치
                </H2WithLogo>
                <ShadowImage src="/img/Metamask-install.gif" alt="" width="100%" />
                {/* <Instruction><Number>1</Number>우측 상단에 있는 지갑 아이콘을 클릭해주세요.</Instruction>
                <Instruction><Number>2</Number>‘MetaMask’ 탭을 클릭해주세요.</Instruction>
                <Instruction><Number>3</Number>사용자 환경에 맞는 메타마스크 프로그램을 설치해주세요.</Instruction> */}
                <Instruction>
                    <Number>1</Number>
                    <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn" target="_blank" rel="noreferrer">MetaMask 크롬 확장 프로그램</a>을 설치해주세요.
                </Instruction>
            </Step>
            <Step>
                <H2WithLogo>
                    <img src="/img/eth-diamond-black.png" alt="" />
                    Ethereum 지갑 생성
                </H2WithLogo>
                <ShadowImage src="/img/Metamask-make-wallet.gif" alt="" width="100%" />
                <Instruction><Number>1</Number><b>MetaMask</b>를 실행해주세요.</Instruction>
                <Instruction><Number>2</Number><b>시작하기</b> 버튼을 클릭해주세요.</Instruction>
                <Instruction><Number>3</Number><b>동의함</b> 버튼을 클릭해주세요.</Instruction>
                <Instruction><Number>4</Number><b>지갑 생성</b> 버튼을 클릭해주세요.</Instruction>
                <Instruction><Number>5</Number>비밀번호를 설정하고, 약관에 동의한 후 <b>생성</b>버튼을 클릭해주세요.</Instruction>
                <Instruction><Number>6</Number><a href="#" onClick={addNetwork}>폴리곤 네트워크</a>를 눌러 추가해 주세요.</Instruction>
            </Step>
        </ModalElement>
    );
};

export default WalletHelpModal;