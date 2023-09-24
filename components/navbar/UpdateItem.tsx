import React from 'react'
import style from "./UpdateItem.module.css"
import Link from 'next/link'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EventIcon from '@mui/icons-material/Event';
import { getDate } from '@/utils/getDate';

export function UpdateItem({
    updateType,
    updatedItemData,
    updateDate
}: {
    updateType: string;
    updatedItemData: {
        name?: string;
        date?: string;
    };
    updateDate: string;
}) {

    let title = "הודעה";
    let link = "/";
    let page = "";
    let message = "";

    if (updateType === "meeting_update") {
        title = "תזכורת לפגישת דיירים";
        link = "/meetings";
        page = "הפגישות";
        message = `
            פגישת דיירים ${updatedItemData?.name ? `"${updatedItemData?.name}"` : ""}
            תתקיים ב-
            ${updatedItemData.date ? getDate(updatedItemData.date) : "קרוב"}.
        `
    }
    if (updateType === "fault_update") {
        title = "תקלה טופלה";
        link = "/faults";
        page = "התקלות";
        message = `
            התקלה "${updatedItemData.name}"
            טופלה.
        `
    }

    return (
        <div className={style.update_card}>
            <h4>
                {updateType === "fault_update" ? <CheckCircleOutlineIcon /> : <EventIcon />}
                <span>
                    {title}
                </span>
            </h4>
            <p>
                {message}
                <br />
                פרטים נוספים
                {" "}
                <Link href={link}>בעמוד {page}</Link>
                .
            </p>
            <span className={style.date}>{getDate(updateDate)}</span>
        </div>
    )
}
