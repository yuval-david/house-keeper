import { PageLayout } from '@/components/UI/PageLayout'
import React, { useState } from 'react'
import style from "../../styles/AddMeeting.module.css"
import { CustomInputRow } from '@/components/UI/FormFields/CustomInputRow'
import { ButtonSave } from '@/components/UI/ButtonSave';
import { Loader } from '@/components/UI/Loader';
import { ModalMessage } from '@/components/UI/Modals/ModalMessage';
import { userStore } from '@/stores/UserStore';

export default function addMeetingPage() {

    // Get User Details
    const { is_vahadbait, is_management_company, building_id } = userStore();

    // Form Values
    const [meetingName, setMeetingName] = useState<string>("");
    const [meetingDate, setMeetingDate] = useState<string>("");
    const [meetingTime, setMeetingTime] = useState<string>("");
    const [meetingPlace, setMeetingPlace] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    // Form loading
    const [isLoadingAdd, setIsLoadingAdd] = useState<boolean>(false);
    const [successModal, setSuccessModal] = useState(false);
    const [errorModal, setErrorModal] = useState(false);

    const handleCloseSuccessModal = () => {
        setSuccessModal(false);
    }
    const handleCloseErrorModal = () => {
        setErrorModal(false);
    }

    const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
    const addMeetingEndpoint = apiEndpoint + `/v2/buildings/${building_id}/meetings`;

    // Sumbit ADD-MEETING form
    const handleSubmit = async (event: any) => {
        setIsLoadingAdd(true);
        event.preventDefault();
        const data = {
            name: meetingName,
            date: meetingDate,
            time: meetingTime,
            location: meetingPlace,
            description,
        }

        try {
            const response: any = await fetch(addMeetingEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });
            const resJson = await response.json();
            setIsLoadingAdd(false);
            if (response.ok) {
                setSuccessModal(true);
                resetForm();
            }
        } catch (error) {
            setIsLoadingAdd(false);
            setErrorModal(true);
            console.log(error);
        }
    }

    // Reset form
    const resetForm = () => {
        setMeetingName("");
        setMeetingDate("");
        setMeetingTime("");
        setMeetingPlace("");
        setDescription("");
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
                            <CustomInputRow value={meetingName} onChange={(e) => setMeetingName(e.target.value)} label='נושא' placeholder='' type='text' dir='rtl' />
                            <CustomInputRow required value={meetingDate} onChange={(e) => setMeetingDate(e.target.value)} label='תאריך' placeholder='' type='date' dir='rtl' />
                            <CustomInputRow required value={meetingTime} onChange={(e) => setMeetingTime(e.target.value)} label='שעה' placeholder='' type='time' dir='rtl' />
                            <CustomInputRow required value={meetingPlace} onChange={(e) => setMeetingPlace(e.target.value)} label='מיקום' placeholder='' type='text' dir='rtl' />
                            <CustomInputRow value={description} onChange={(e) => setDescription(e.target.value)} label='הערות' placeholder='' type='textarea' dir='rtl' />
                        </div>
                    </div>
                </div>
                <div className={style.meeting_save_btn}>
                    <ButtonSave text='לחץ לשמירה' type='submit' />
                </div>
            </form>
            <ModalMessage isOpen={successModal} handleClose={handleCloseSuccessModal} message="הפגישה נוצרה בהצלחה" buttonText='אישור' type='success' />
            <ModalMessage isOpen={errorModal} handleClose={handleCloseErrorModal} message="ישנה שגיאה ביצירת הפגישה, אנא נסו שוב." buttonText='אישור' type='error' />
            {isLoadingAdd && <Loader />}
        </PageLayout>
    )
}
