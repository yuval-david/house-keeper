import { PageLayout } from '@/components/UI/PageLayout'
import React, { useEffect, useMemo, useState } from 'react'
import style from "../../../styles/UpdateMeetingStatus.module.css"
import { Loader } from '@/components/UI/Loader';
import { ButtonSave } from '@/components/UI/ButtonSave';
import { Meeting } from '@/Types/objects_types';
import { useRouter } from 'next/router';
import { getDate } from '@/utils/getDate';
import { ModalMessage } from '@/components/UI/Modals/ModalMessage';

export default function updateStatusPage() {

    const router = useRouter();

    // Hardcoded - need to come from store after login
    const buildingID = 1;
    const { id: meetingId } = router.query;
    const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;

    const meetingEndpoint = useMemo(() => {
        return apiEndpoint + `/v2/buildings/${buildingID}/meetings/${meetingId}`;
    }, [buildingID, meetingId]);


    // Form loading
    const [attending, setIsAttending] = useState<boolean>(false);
    const [isLoadingUpdateStatus, setIsLoadingUpdateStatus] = useState<boolean>(false);
    const [isLoadingMeetingData, setIsLoadingMeetingData] = useState<boolean>(false);
    const [successModal, setSuccessModal] = useState(false);
    const [errorModal, setErrorModal] = useState(false);
    const [meetingData, setMeetingData] = useState<Meeting>();

    const handleCloseSuccessModal = () => {
        setSuccessModal(false);
        router.push("/meetings");
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

    // Need to add real request
    const handleSubmit = (event: any) => {
        event.preventDefault();
        setIsLoadingUpdateStatus(true);

        const data = {
            attending
        }
        console.log("Data", data);
        setIsLoadingUpdateStatus(false);
        setSuccessModal(true);
    }



    const meetingTitle = meetingData?.name || "פגישת דיירים";
    const meetingDate = getDate(meetingData?.date || "");
    const meetingTimeParts = meetingData?.time.split(":") || [];
    const meetingTime = meetingTimeParts.length > 0 ? meetingTimeParts[0] + ":" + meetingTimeParts[1] : "";
    const meetingLocation = meetingData?.location || "";


    if (isLoadingMeetingData) return (
        <PageLayout pageTitle='עדכון סטטוס הגעה'>
            <Loader isShadow={false} message='טוען פרטי פגישה...' />
        </PageLayout>
    );



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
                    <ModalMessage isOpen={successModal} handleClose={handleCloseSuccessModal} message="סטטוס ההגעה עודכן בהצלחה" buttonText='אישור' type='success' />
                    <ModalMessage isOpen={errorModal} handleClose={handleCloseErrorModal} message="ישנה שגיאה בעדכון סטטוס ההגעה, אנא נסו שוב." buttonText='אישור' type='error' />
                </div>
            </form>
            {isLoadingUpdateStatus && <Loader />}
        </PageLayout>
    )
}
