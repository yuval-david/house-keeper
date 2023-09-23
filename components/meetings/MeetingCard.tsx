import React from 'react'
import style from "./MeetingCard.module.css"
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getDate } from '@/utils/getDate';

export function MeetingCard({
    id,
    name,
    date,
    time,
    location,
    description,
    isSummary,
}: {
    id: number;
    name?: string;
    date: string;
    time: string;
    location: string;
    description?: string;
    isSummary?: boolean;
}) {
    const router = useRouter();

    const handleClickViewShortBtn = () => {
        router.push(`/meetings/${id}/view-summary`);
    }

    const handleClickAddShortBtn = () => {
        router.push(`/meetings/${id}/add-summary`);
    }

    const handleClickAddCalender = () => {
        alert("הוספה ליומן");
    }

    const meetingTitle = name || "פגישת דיירים";
    const meetingDate = getDate(date);
    const meetingTimeParts = time.split(":");
    const meetingTime = meetingTimeParts[0] + ":" + meetingTimeParts[1];

    return (
        <div className={style.meeting_card}>
            <div className={style.icon_part}>
                <div className={style.icon_container}>
                    <img src="/icons/meeting-icon.png" alt="meeting" />
                </div>
            </div>
            <div className={style.content_part}>
                <div className={style.meeting_details}>
                    <h3>{meetingTitle} - בתאריך {meetingDate}</h3>
                    {!!description && <p className={style.desc}>{description}</p>}
                    <div className={style.details_container}>
                        <div className={style.date_part}>
                            <div className={style.detail}>
                                <span className={style.label}>שעה:</span>
                                <span> {meetingTime}</span>
                            </div>
                            <div className={style.detail}>
                                <span className={style.label}>מיקום:</span>
                                <span> {location}</span>
                            </div>
                        </div>
                        <div className={style.btn_status_part}>
                            <Link href={`/meetings/${id}/update-status`}>
                                לחץ כאן לעדכון סטטוס הגעה
                            </Link>
                        </div>
                    </div>
                </div>

                <div className={style.meeting_actions}>
                    <div>
                        <button type='button' onClick={handleClickAddCalender} className={style.btn_add_calendar}>
                            הוספה ליומן
                        </button>
                        <button type='button' className={style.btn_send_alert}>
                            שליחת תזכור לפגישה
                        </button>
                    </div>
                    <div>
                        {isSummary && <button type='button' onClick={handleClickViewShortBtn} className={style.btn_view_short}>
                            לצפייה בתקציר הפגישה
                        </button>}
                        {!isSummary && <button type='button' onClick={handleClickAddShortBtn} className={style.btn_add_short}>
                            הוספת תקציר לפגישה
                        </button>}
                    </div>
                </div>
            </div>
        </div>
    )
}
