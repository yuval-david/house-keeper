import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import style from "./ModalMessage.module.css"

const styleModal = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
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
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {message}
                </Typography>
                <button onClick={handleClickMainButton} type='button'>{mainButtonText}</button>
                <button onClick={handleClose} type='button'>{secondButtonText}</button>
            </Box>
        </Modal>
    );
}
