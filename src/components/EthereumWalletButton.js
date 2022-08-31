import detectEthereumProvider from "@metamask/detect-provider";
import { Fade, Menu, MenuItem } from "@mui/material";
import { styled } from "@mui/system";
import React, { useRef, useState } from "react";


const CenteredMenuItem = styled(MenuItem)`
    justify-content:center;
`;

const EthereumWalletButton = ({ setWalletAddress, openAlert, openModal }) => {
    const walletButton = useRef();

    const [anchorEl, setAnchorEl] = useState(null);
    const closeWalletSelect = () => setAnchorEl(null);

    const [isLoading, setIsLoading] = useState(false);
    const startLoading = () => setIsLoading(true);
    const finishLoading = () => setIsLoading(false);

    const [accounts, setAccounts] = useState([]);

    const requestEthereumWallet = async () => {
        try {
            startLoading();
            const provider = await detectEthereumProvider();
            const accounts = await provider.request({ method: 'eth_requestAccounts' });
            setAccounts(accounts);
            setAnchorEl(walletButton.current);
        }
        catch (e) {
            if (e instanceof TypeError) {
                openAlert('MetaMask를 설치하세요');
                openModal();
                return false;
            }
            else {
                openAlert('MetaMask에서 연결 허용해주세요');
            }
        }
        finally{
            finishLoading();
        }
    };

    const returnWalletAddress = (e) => {
        const walletAddress = e.target.innerText;
        setWalletAddress(walletAddress);
        closeWalletSelect();
    };

    return (
        <>
            <button className="ethereum-wallet-button" loading={isLoading ? "true" : "false"} onClick={requestEthereumWallet} ref={walletButton}>
                <img src="/img/metamask.png" alt="" />
            </button>
            <Menu
                sx={{ mt: -1 }}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={closeWalletSelect}
                TransitionComponent={Fade}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        '& .ethereum-wallet-button': {
                            width: 32,
                            height: 32,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            bottom: 0,
                            right: 15,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
            >
                {
                    accounts
                        .map(account => (
                            <CenteredMenuItem key={account} onClick={returnWalletAddress}>
                                {account}
                            </CenteredMenuItem>
                        ))
                }
            </Menu>
        </>
    );
};

export default EthereumWalletButton;