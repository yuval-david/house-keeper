import React from 'react'
import style from "./MeetingCard.module.css"
import Link from 'next/link'
import { useRouter } from 'next/router'

export function MeetingCard() {

    const router = useRouter();

    const handleClickViewShortBtn = () => {
        router.push("/meetings/view-summary");
    }

    const handleClickAddShortBtn = () => {
        router.push("/meetings/add-summary");
    }

    const handleClickAddCalender = () => {
        alert("הוספה ליומן");
    }

    return (
        <div className={style.meeting_card}>
            <div className={style.icon_part}>
                <div className={style.icon_container}>
                    <img src="/icons/meeting-icon.png" alt="meeting" />
                </div>
            </div>
            <div className={style.content_part}>
                <div className={style.meeting_details}>
                    <h3>פגישת דיירים - בתאריך 17.10.23</h3>
                    <div className={style.details_container}>
                        <div className={style.date_part}>
                            <div className={style.detail}>
                                <span className={style.label}>שעה:</span>
                                <span> 17:00</span>
                            </div>
                            <div className={style.detail}>
                                <span className={style.label}>מיקום:</span>
                                <span> לובי</span>
                            </div>
                        </div>
                        <div className={style.btn_status_part}>
                            <Link href="/meetings/update-status">
                                לחץ כאן לעדכון סטטוס הגעה
                            </Link>
                        </div>
                    </div>
                </div>

                <div className={style.meeting_actions}>
                    <div>
                        <button type='button' onClick={handleClickViewShortBtn} className={style.btn_view_short}>
                            לצפייה בתקציר הפגישה
                        </button>
                        <button type='button' onClick={handleClickAddCalender} className={style.btn_add_calendar}>
                            הוספה ליומן
                        </button>
                    </div>
                    <div>
                        <button type='button' className={style.btn_send_alert}>
                            שליחת תזכור לפגישה
                        </button>
                        <button type='button' onClick={handleClickAddShortBtn} className={style.btn_add_short}>
                            הוספת תקציר לפגישה
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
