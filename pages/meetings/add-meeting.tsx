import { PageLayout } from '@/components/UI/PageLayout'
import React, { useState } from 'react'
import style from "../../styles/AddMeeting.module.css"
import { CustomInputRow } from '@/components/UI/FormFields/CustomInputRow'
import { ButtonSave } from '@/components/UI/ButtonSave';

export default function addMeetingPage() {
    const [meetingDate, setMeetingDate] = useState<string>("");
    const [meetingTime, setMeetingTime] = useState<string>("");
    const [meetingPlace, setMeetingPlace] = useState<string>("");

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const data = {
            meetingDate,
            meetingTime,
            meetingPlace,
        }
        console.log(data);
    }
    return (
        <PageLayout pageTitle='הוספת פגישה חדשה'>
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
                        <div className={style.details_list}>
                            <CustomInputRow required value={meetingDate} onChange={(e) => setMeetingDate(e.target.value)} label='תאריך:' placeholder='' type='date' dir='rtl' />
                            <CustomInputRow required value={meetingTime} onChange={(e) => setMeetingTime(e.target.value)} label='שעה:' placeholder='' type='time' dir='rtl' />
                            <CustomInputRow required value={meetingPlace} onChange={(e) => setMeetingPlace(e.target.value)} label='מיקום:' placeholder='' type='text' dir='rtl' />
                        </div>
                    </div>
                </div>
                <div className={style.meeting_save_btn}>
                    <ButtonSave text='לחץ לשמירה' type='submit' />
                </div>

            </form>
        </PageLayout>
    )
}
