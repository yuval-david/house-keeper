import React, { useState } from 'react'
import style from "./MeetingCard.module.css"
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getDate } from '@/utils/getDate';
import { userStore } from '@/stores/UserStore';
import { ModalMessage } from '../UI/Modals/ModalMessage';
import { Loader } from '../UI/Loader';

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

    // Get User details
    const { building_id, is_vahadbait } = userStore();
    const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
    const updatesEndpoint = apiEndpoint + `/v2/buildings/${building_id}/updates`;

    // Form loading
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [successModal, setSuccessModal] = useState(false);
    const [errorModal, setErrorModal] = useState(false);

    const handleCloseSuccessModal = () => {
        setSuccessModal(false);
    }
    const handleCloseErrorModal = () => {
        setErrorModal(false);
    }

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

    const handleClickSendUpdate = async () => {

        if (!building_id) alert("User not allowed, missing building code.");

        setIsLoading(true);
        const data = {
            type: "meeting",
            item_id: id,
            item_name: name,
            item_date: date
        };

        const response = await fetch(updatesEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        setIsLoading(false);

        if (response.ok) {
            const resJson = response.json();
            setSuccessModal(true);
        } else {
            console.log(response);
            setErrorModal(true);
        }

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
                    <div style={is_vahadbait ? {} : { flexDirection: "row-reverse" }}>
                        <button type='button' onClick={handleClickAddCalender} className={style.btn_add_calendar}>
                            הוספה ליומן
                        </button>
                        {is_vahadbait && <button type='button' className={style.btn_send_alert} onClick={handleClickSendUpdate}>
                            שליחת תזכור לפגישה
                        </button>}
                    </div>
                    <div style={is_vahadbait ? {} : { flexDirection: "row-reverse" }}>
                        {isSummary && <button type='button' onClick={handleClickViewShortBtn} className={style.btn_view_short}>
                            לצפייה בתקציר הפגישה
                        </button>}
                        {!isSummary && is_vahadbait && <button type='button' onClick={handleClickAddShortBtn} className={style.btn_add_short}>
                            הוספת תקציר לפגישה
                        </button>}
                    </div>
                </div>
            </div>
            <ModalMessage isOpen={successModal} handleClose={handleCloseSuccessModal} message="נשלחה תזכורת לפגישה! תוכלו למצוא אותה באזור העדכונים." buttonText='אישור' type='success' />
            <ModalMessage isOpen={errorModal} handleClose={handleCloseErrorModal} message="ישנה שגיאה בשליחת התזכורת, אנא נסו שוב." buttonText='אישור' type='error' />
            {isLoading && <Loader />}
        </div>
    )
}
