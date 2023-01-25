export const downloadImage = async (fileName) => {
    const imageUrl = `https://${fileName}.ipfs.nftstorage.link`;
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