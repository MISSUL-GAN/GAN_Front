import { Card, CircularProgress, ClickAwayListener, Paper, Skeleton, styled as style, Tooltip, tooltipClasses } from "@mui/material";
import { width } from "@mui/system";
import React, { useCallback, useEffect, useState } from "react";
import styled from 'styled-components';
import { getMintedNFT, getOpenseaPermalink, getTokenIdOwners, getWalletTokenIdTransfers } from "../api/nftApi";

const NFTButton = styled.button`
    display: flex;
    flex-grow: 1;
    height: 60px;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-weight: 300;
    font-size: 18px;
    background: #3C6B50;
    border: none;
    border-radius: 8px;
    color: #FFFFFF;
    max-width: 200px;
    padding-right: 0px !important;

    &:disabled {
        opacity: 0.8;
    }
`;

const LoadingIndicator = style(CircularProgress)`
    color: white;
    margin-right: 10px;
    &:disabled {
        display: none;
    }
`

const NFTButtonDiv = styled.div`
    display: flex;
    flex-grow: 1;
    max-width: 200px;
`;

const OpenseaIcon = styled.button`
    min-width:60px;
    width: 60px;
    height: 60px;
    background-image: url('/img/openseaIcon.png');
    background-size: contain;

    &:disabled {
        opacity: 0.6;
    }
`

const Address = styled.a`
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const PaddedPaper = styled(Card)`
    padding: 10px;
`;

const NFTTooltip = style(({ className, ...props }) => (
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
        filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.15))",
        maxWidth: "300px",
    },
}));

const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";

const NFTStats = ({ nftTransactionHash }) => {

    const [nftInfo, setNftInfo] = useState({ owners: [], transfers: [], permalink: null });
    const [isLoading, setIsLoading] = useState(false);
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const getDrawingNFTInfo = useCallback(async function () {
        if ( !nftTransactionHash || nftInfo.owners.length) return false;
        setIsLoading(true);
        const { contract_address: contractAddress, token_id: tokenId } = await getMintedNFT(nftTransactionHash);
        const owners = await getTokenIdOwners(contractAddress, tokenId);
        const transfers = await getWalletTokenIdTransfers(contractAddress, tokenId);
        const permalink = await getOpenseaPermalink(contractAddress, tokenId);
        const nftStat = { owners, transfers, permalink };
        setNftInfo(nftStat);
        setIsLoading(false);
    }, [nftInfo.owners.length, nftTransactionHash]);

    async function clickNFT() {
        if (!isLoading && nftInfo.owners.length)
            setTooltipOpen(true);
    }

    const NFTInfoFragment = (
        <>
            <div>
                <strong>소유자 목록</strong>
                <div>
                    {
                        nftInfo.owners.map(owner => (
                            <PaddedPaper key="owner">
                                <Address href={`https://opensea.io/${owner.owner_of}`} target="_blank" rel="noreferrer">{owner.owner_of}</Address>
                                <strong>{owner.amount}개</strong>
                            </PaddedPaper>
                        ))
                    }
                </div>
            </div>
            <hr />

            <div>
                <strong>최근 거래 내역</strong>
                {
                    nftInfo.transfers.map(transfer => (
                        <PaddedPaper key="transfer">
                            <Address href={transfer.from_address === NULL_ADDRESS ? null : `https://opensea.io/${transfer.from_address}`} target="_blank">{transfer.from_address === NULL_ADDRESS ? "널 주소" : transfer.from_address}</Address>
                            <span>⬇</span>
                            <Address href={`https://opensea.io/${transfer.to_address}`} target="_blank">{transfer.to_address}</Address>
                            <strong>{transfer.amount}개</strong> {new Date(transfer.block_timestamp).toLocaleString()}
                        </PaddedPaper>
                    ))
                }
            </div>
        </>
    );

    useEffect(() => {
        getDrawingNFTInfo()
    }, [getDrawingNFTInfo]);

    return (
        <>
        <OpenseaIcon disabled={!nftTransactionHash || isLoading} onClick={()=>window.open(nftInfo.permalink)}/>
            <ClickAwayListener onClickAway={() => setTooltipOpen(false)}>
                <NFTButtonDiv>
                    <NFTTooltip
                        open={tooltipOpen}
                        title={NFTInfoFragment}
                        onClose={() => setTooltipOpen(false)}
                        className="NFTButton"
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                    >
                        <NFTButton className="NFTButton" onClick={clickNFT} disabled={!nftTransactionHash || isLoading}><LoadingIndicator hidden={!isLoading} size="24px"/> NFT 정보 </NFTButton>
                    </NFTTooltip>
                </NFTButtonDiv>
            </ClickAwayListener>
        </>
    );
};

export default NFTStats;