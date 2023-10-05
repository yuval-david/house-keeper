import React, { useState } from 'react'
import style from "./ModalCalendarMessage.module.css"
import { ButtonEditItem } from '../UI/ButtonEditItem';
import { CustomInput } from '../UI/FormFields/CustomInput';
import { userStore } from '@/stores/UserStore';
import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/material';

export function ModalCalendarMessage({
    selectedEmail,
    setSelectedEmail
}: {
    selectedEmail: string;
    setSelectedEmail: (value: string) => void;
}) {


    // Get User details
    const { email: usernameMail } = userStore();

    const [displayInput, setDisplayInput] = useState(false);
    const handleClickEdit = () => {
        if (displayInput) {
            setSelectedEmail(usernameMail);
        }
        setDisplayInput(!displayInput);
    }

    return (
        <div style={{ overflow: "auto" }}>
            <p className={style.message_text}>
                ברצונך להוסיף את הפגישה ביומן של כתובת המייל: {selectedEmail} ?
            </p>
            <button className={style.btn_edit} type='button' onClick={handleClickEdit}>
                {displayInput ? "ביטול" : `לשינוי כתובת המייל`}
                {!displayInput && <EditIcon fontSize='small' />}
            </button>
            {displayInput &&
                <Box className={style.input_container}>
                    <CustomInput type='email' dir="ltr" value={selectedEmail} onChange={e => setSelectedEmail(e.target.value)} />
                </Box>}
        </div>
    )
}
