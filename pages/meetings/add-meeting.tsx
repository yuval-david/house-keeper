import { PageLayout } from '@/components/UI/PageLayout'
import React, { useState } from 'react'
import style from "../../styles/AddMeeting.module.css"
import { CustomInputRow } from '@/components/UI/FormFields/CustomInputRow'
import { ButtonSave } from '@/components/UI/ButtonSave';

export default function addMeetingPage() {

    // Hardcoded - need to come from store after login
    const buildingID = 1;

    // Form Values
    const [meetingDate, setMeetingDate] = useState<string>("");
    const [meetingTime, setMeetingTime] = useState<string>("");
    const [meetingPlace, setMeetingPlace] = useState<string>("");

    const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
    const addMeetingEndpoint = apiEndpoint + `/v1/buildings/${buildingID}/meetings`;

    // Sumbit ADD-MEETING form
    const handleSubmit = (event: any) => {
        event.preventDefault();
        const data = {
            date: meetingDate,
            time: meetingTime,
            location: meetingPlace,
        }
        console.log("Form Data: ", data);
        const response = fetch(addMeetingEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
        console.log("Response: ", response);
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
