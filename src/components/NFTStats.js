import React, { useState } from "react";
import styled from 'styled-components';
import { getMintedNFT, getOpenseaPermalink, getTokenIdOwners, getWalletTokenIdTransfers } from "../api/nftApi";

const HiddenInput = styled.input`
  display: none;
`;

const Tag = styled.div`
    & {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0px 20px;
        height: 40px;
        background: #F4F4F4;
        border-radius: 40px;
        color: #3C6B50;
        cursor: pointer;

        margin-right: 10px;
        margin-top: 10px;
    }

    ${HiddenInput}:checked + & {
        color: #FFFFFF;
        background: #3C6B50;
    }
`;


const NFTStats = ({ nftTransactionHash }) => {

    const [seeNFT, setSeeNFT] = useState(true);
    const [nftInfo, setNftInfo] = useState([]);

    async function getDrawingNFTInfo() {
        const { contract_address: contractAddress, token_id: tokenId } = await getMintedNFT(nftTransactionHash);
        const owners = await getTokenIdOwners(contractAddress, tokenId);
        const transfers = await getWalletTokenIdTransfers(contractAddress, tokenId);
        const permalink = await getOpenseaPermalink(contractAddress, tokenId);
        const nftInfo = { owners, transfers, permalink };
        setNftInfo(nftInfo);
    }

    function clickNFT() {
        setSeeNFT(state => !state);
        if (seeNFT)
            getDrawingNFTInfo();
    }

    return (
        <>
            <button id="open-nft-button" onClick={clickNFT}> NFT 통계 정보 </button>
            <div>
                <a href={nftInfo.permalink} target="_blank" rel="noreferrer"> OpenSea에서 보기 </a>
                <div>소유자 목록</div>
                <div>
                    {
                        nftInfo.owners.map(owner => (
                            <div>
                                {/* <img src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg" width={20} alt="" /> */}
                                <a href={`https://opensea.io/${owner.owner_of}`} target="_blank" rel="noreferrer">{owner.owner_of}</a>
                                <p>{owner.amount}개</p>
                            </div>
                        ))
                    }
                </div>
            </div>
            <hr />

            <div>
                최근 거래 내역 <br />
                {
                    nftInfo.transfers.map(transfer => (
                        <div>
                            {`${transfer.from_address} => ${transfer.to_address}`}<br />
                            {new Date(transfer.block_timestamp).toLocaleString()}<br />
                            {transfer.amount}개
                        </div>
                    ))
                }
                {/* {nftInfo.last_sale.event_timestamp.replace("T", " ")} /
                                                        사용자 {nftInfo.last_sale.transaction.from_account.user.username}가
                                                        0.{nftInfo.last_sale.total_price.substring(0, 2)} {nftInfo.last_sale.payment_token.symbol}에 거래 */}
            </div>
        </>
    );
};

export default NFTStats;