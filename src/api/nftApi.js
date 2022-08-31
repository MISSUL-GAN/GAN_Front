import { Axios } from "./api";

export const getNFTInfo = async (assetContractAddress, tokenId) => {
    const response = await Axios.get(`https://api.opensea.io/api/v1/asset/${assetContractAddress}/${tokenId}/`);
    return response.data;
}

export const getMintedNFT = async (nftTransactionHash) => {
    const response = await Axios.get(`https://api.nftport.xyz/v0/mints/${nftTransactionHash}?chain=polygon`,
        { headers: { Authorization: "515b3784-7b63-4055-8b6f-b7d6653cf5d0" } }
    );
    return response.data;
}

export const getTokenIdOwners = async (contractAddress, tokenId) => {
    const response = await Axios.get(`https://deep-index.moralis.io/api/v2/nft/${contractAddress}/${tokenId}/owners?chain=polygon&format=decimal`,
        { headers: { "X-API-KEY": "test" } }
    );
    return response.data.result;
}

export const getWalletTokenIdTransfers = async (contractAddress, tokenId) => {
    const response = await Axios.get(`https://deep-index.moralis.io/api/v2/nft/${contractAddress}/${tokenId}/transfers?chain=polygon&format=decimal`,
        { headers: { "X-API-KEY": "test" } }
    );
    return response.data.result;
}

export const getOpenseaPermalink = async (contractAddress, tokenId) => {
    return `https://opensea.io/assets/matic/${contractAddress}/${tokenId}`;
}