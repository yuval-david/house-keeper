import React from 'react'
import style from "./MeetingCard.module.css"

export function MeetingCard() {
    return (
        <div className={style.meeting_card}>
            <div className={style.icon_part}>
                <div className={style.icon_container}>
                    <img src="/icons/meeting-icon.png" alt="meeting" />
                </div>
            </div>
            <div className={style.content_part}>
                
            </div>
        </div>
    )
}
