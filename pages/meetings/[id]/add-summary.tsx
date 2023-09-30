import { PageLayout } from '@/components/UI/PageLayout'
import React, { useEffect, useMemo, useState } from 'react'
import style from "../../../styles/AddSummary.module.css"
import { ButtonSave } from '@/components/UI/ButtonSave';
import { Loader } from '@/components/UI/Loader';
import { CustomInput } from '@/components/UI/FormFields/CustomInput';
import { useRouter } from 'next/router';
import { Meeting } from '@/Types/objects_types';
import { getDate } from '@/utils/getDate';
import { ModalMessage } from '@/components/UI/Modals/ModalMessage';

export default function addSummaryPage() {

    const router = useRouter();

    // Hardcoded - need to come from store after login
    const buildingID = 1;
    const { id: meetingId } = router.query;
    const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;

    const meetingEndpoint = useMemo(() => {
        return apiEndpoint + `/v2/buildings/${buildingID}/meetings/${meetingId}`;
    }, [buildingID, meetingId]);

    // Form loading
    const [isLoadingAddSummary, setIsLoadingAddSummary] = useState<boolean>(false);
    const [isLoadingMeetingData, setIsLoadingMeetingData] = useState<boolean>(false);
    const [successModal, setSuccessModal] = useState(false);
    const [errorModal, setErrorModal] = useState(false);
    const [meetingData, setMeetingData] = useState<Meeting>();
    const [summary, setSummary] = useState<string>("");

    const handleCloseSuccessModal = () => {
        setSuccessModal(false);
        router.push(`/meetings/${meetingId}/view-summary`);
    }
    const handleCloseErrorModal = () => {
        setErrorModal(false);
    }

    // Fetch Meeting Data
    useEffect(() => {
        if (meetingId) {
            setIsLoadingMeetingData(true);
            fetch(meetingEndpoint)
                .then((res) => res.json())
                .then((data) => {
                    setIsLoadingMeetingData(false);
                    setMeetingData(data.meeting);
                }).catch(err => {
                    setIsLoadingMeetingData(false);
                    console.log(err);
                });
        }
    }, [meetingId]);

    // Submit add meeting summary
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setIsLoadingAddSummary(true);

        const data = {
            summary
        }

        if (meetingId) {
            try {
                const response: any = await fetch(meetingEndpoint, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data)
                });
                const resJson = await response.json();
                setIsLoadingAddSummary(false);
                if (response.ok) {
                    setSuccessModal(true);
                }
            } catch (error) {
                setIsLoadingAddSummary(false);
                setErrorModal(true);
                console.log(error);
            }
        }
    }

    const meetingTitle = meetingData?.name || "פגישת דיירים";
    const meetingDate = getDate(meetingData?.date || "");
    const meetingTimeParts = meetingData?.time.split(":") || [];
    const meetingTime = meetingTimeParts.length > 0 ? meetingTimeParts[0] + ":" + meetingTimeParts[1] : "";
    const meetingLocation = meetingData?.location || "";


    if (isLoadingMeetingData) return (
        <PageLayout pageTitle='הוספת תקציר לפגישה'>
            <Loader isShadow={false} message='טוען פרטי פגישה...' />
        </PageLayout>
    );

    return (
        <PageLayout pageTitle='הוספת תקציר לפגישה'>
            <form className={style.form} onSubmit={handleSubmit}>
                <div className={style.meeting_card}>
                    <div className={style.icon_part}>
                        <div className={style.icon_container}>
                            <img src="/icons/meeting-icon.png" alt="meeting" />
                        </div>
                    </div>
                    <div className={style.content_part}>
                        <h2>{meetingTitle}</h2>
                        <h4>פרטי הפגישה</h4>
                        <div className={style.details_existing}>
                            <div className={style.detail}>
                                <span className={style.label}>תאריך:</span>
                                <span> {meetingDate}</span>
                            </div>
                            <div className={style.detail}>
                                <span className={style.label}>שעה:</span>
                                <span> {meetingTime}</span>
                            </div>
                            <div className={style.detail}>
                                <span className={style.label}>מיקום:</span>
                                <span> {meetingLocation}</span>
                            </div>
                        </div>
                        <div className={style.details_list}>
                            <CustomInput label="תקציר הפגישה" type="textarea" value={summary} onChange={(e) => setSummary(e.target.value)} textareaRows={5} required={true} />
                        </div>
                    </div>
                </div>
                <div className={style.meeting_save_btn}>
                    <ButtonSave text='לחץ לשמירה' type='submit' />
                </div>
            </form>
            {isLoadingAddSummary && <Loader />}
            <ModalMessage isOpen={successModal} handleClose={handleCloseSuccessModal} message="התקציר נוסף בהצלחה" buttonText='אישור' type='success' />
            <ModalMessage isOpen={errorModal} handleClose={handleCloseErrorModal} message="ישנה שגיאה בהוספת התקציר לפגישה, אנא נסו שוב." buttonText='אישור' type='error' />
        </PageLayout>
    )
}
