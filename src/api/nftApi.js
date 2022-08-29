import axios from 'axios';

export const getNFTInfo = async (assetContractAddress, tokenId) => {
    const response = await axios.get(`https://testnets-api.opensea.io/api/v1/asset/${assetContractAddress}/${tokenId}/`);
    return response.data;
}