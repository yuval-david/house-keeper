import { PageLayout } from '@/components/UI/PageLayout'
import React, { useState } from 'react'
import style from "../../../styles/UpdateMeetingStatus.module.css"
import { Loader } from '@/components/UI/Loader';
import { ButtonSave } from '@/components/UI/ButtonSave';

export default function updateStatusPage() {
    // Form loading
    const [isLoadingUpdateStatus, setIsLoadingUpdateStatus] = useState<boolean>(false);
    const [attending, setIsAttending] = useState<boolean>(false);

    // Need to add real request
    const handleSubmit = (event: any) => {
        event.preventDefault();
        setIsLoadingUpdateStatus(true);

        const data = {
            attending
        }
        console.log("Data", data);
        setIsLoadingUpdateStatus(false);
        alert("תודה!");
    }

    return (
        <PageLayout pageTitle='עדכון סטטוס הגעה'>
            <form className={style.form} onSubmit={handleSubmit}>
                <div className={style.meeting_card}>
                    <div className={style.icon_part}>
                        <div className={style.icon_container}>
                            <img src="/icons/meeting-icon.png" alt="meeting" />
                        </div>
                    </div>
                    <div className={style.content_part}>
                        <h2>פגישת ועד בית</h2>
                        <h4>פרטי הפגישה</h4>
                        <div className={style.details_existing}>
                            <div className={style.detail}>
                                <span className={style.label}>תאריך:</span>
                                <span> 10.09.2023</span>
                            </div>
                            <div className={style.detail}>
                                <span className={style.label}>שעה:</span>
                                <span> 16:00</span>
                            </div>
                            <div className={style.detail}>
                                <span className={style.label}>מיקום:</span>
                                <span> דירה 3</span>
                            </div>
                        </div>
                        <div className={style.status_select}>
                            <h4>נא סמן סטטוס הגעה</h4>
                            <div className={style.radio_options}>
                                <div className={style.radio_container}>
                                    <input type='radio' value={1} name="isAttend" id="Yes" onChange={(e) => setIsAttending(!!parseInt(e.target.value))} />
                                    <label htmlFor="Yes">מגיע/ה</label>
                                </div>
                                <div className={style.radio_container}>
                                    <input type='radio' value={0} name="isAttend" id="No" onChange={(e) => setIsAttending(!!parseInt(e.target.value))} />
                                    <label htmlFor="No">לא מגיע/ה</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.meeting_save_btn}>
                    <ButtonSave text='לחץ לשמירה' type='submit' />
                </div>
            </form>
            {isLoadingUpdateStatus && <Loader />}
        </PageLayout>
    )
}
