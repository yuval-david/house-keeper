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
    width: {
        xs: "80%",
        md: "35%",
        xl: "30%",
    },
    bgcolor: 'background.paper',
    boxShadow: 24,
    textAlign: "center",
    p: 4,
    borderRadius: "10px",
    border: "3px solid black",
};

export function ModalMessage({
    isOpen,
    handleClose,
    message,
    buttonText,
    type = "error",
}: {
    isOpen: boolean;
    handleClose: () => void;
    message: string;
    buttonText: string;
    type?: "success" | "error" | "warning" | "info";
}) {

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styleModal} className={style[type]}>
                <Typography id="modal-modal-description" className={style.message}>
                    {message}
                </Typography>
                <button className={style.button} onClick={handleClose} type='button'>{buttonText}</button>
            </Box>
        </Modal>
    );
}
