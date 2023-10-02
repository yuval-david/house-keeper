import React from 'react'
import style from "./UpdateItem.module.css"
import Link from 'next/link'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EventIcon from '@mui/icons-material/Event';
import { getDate } from '@/utils/getDate';
import { Update } from '@/Types/objects_types';

export function UpdateItem({
    update
}: {
    update: Update
}) {

    let title = "הודעה";
    let link = "/";
    let page = "";
    let message = "";

    if (update.type === "meeting") {
        title = "תזכורת לפגישת דיירים";
        link = "/meetings";
        page = "הפגישות";
        message = `
            פגישת דיירים ${update?.item_name ? `"${update?.item_name}"` : ""}
            תתקיים ב-
            ${update.item_date ? getDate(update.item_date) : "קרוב"}.
        `
    }
    if (update.type === "fault") {
        title = "תקלה טופלה";
        link = "/faults";
        page = "התקלות";
        message = `
            התקלה "${update.item_name}"
            טופלה.
        `
    }

    return (
        <div className={style.update_card}>
            <h4>
                {update.type === "fault" ? <CheckCircleOutlineIcon /> : <EventIcon />}
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
            <span className={style.date}>{getDate(update.timestamp)}</span>
        </div>
    )
}
