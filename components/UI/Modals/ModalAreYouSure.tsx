import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import style from "./ModalAreYouSure.module.css"

const styleModal = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
        xs: "80%",
        md: "35%",
        xl: "30%",
    },
    bgcolor: 'background.paper',
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
};

export function ModalAreYouSure({
    isOpen,
    handleClose,
    message,
    mainButtonText,
    secondButtonText,
    handleClickMainButton,
}: {
    isOpen: boolean;
    handleClose: () => void;
    message: string;
    mainButtonText: string;
    secondButtonText: string;
    handleClickMainButton: (value?: any) => void;
}) {

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styleModal}>
                <Typography id="modal-modal-description" className={style.message}>
                    {message}
                </Typography>
                <div className={style.btns_container}>
                    <button onClick={handleClickMainButton} type='button'>{mainButtonText}</button>
                    <button onClick={handleClose} type='button'>{secondButtonText}</button>
                </div>
            </Box>
        </Modal>
    );
}
