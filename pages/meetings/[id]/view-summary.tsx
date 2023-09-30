import { PageLayout } from '@/components/UI/PageLayout'
import React, { useEffect, useMemo, useState } from 'react'
import style from "../../../styles/ViewMeeting.module.css"
import { useRouter } from 'next/router';
import { Meeting } from '@/Types/objects_types';
import { getDate } from '@/utils/getDate';
import { Loader } from '@/components/UI/Loader';

export default function viewSummaryPage() {

    const router = useRouter();

    // Hardcoded - need to come from store after login
    const buildingID = 1;
    const { id: meetingId } = router.query;
    const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;

    const meetingEndpoint = useMemo(() => {
        return apiEndpoint + `/v2/buildings/${buildingID}/meetings/${meetingId}`;
    }, [buildingID, meetingId]);

    const [isLoadingMeetingData, setIsLoadingMeetingData] = useState<boolean>(false);
    const [meetingData, setMeetingData] = useState<Meeting>();

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


    const meetingTitle = meetingData?.name || "פגישת דיירים";
    const meetingDate = getDate(meetingData?.date || "");
    const meetingTimeParts = meetingData?.time.split(":") || [];
    const meetingTime = meetingTimeParts.length > 0 ? meetingTimeParts[0] + ":" + meetingTimeParts[1] : "";
    const meetingLocation = meetingData?.location || "";
    const meetingSummary = meetingData?.summary || "";


    if (isLoadingMeetingData) return (
        <PageLayout pageTitle='תקציר הפגישה'>
            <Loader isShadow={false} message='טוען פרטי פגישה...' />
        </PageLayout>
    );


    return (
        <PageLayout pageTitle='תקציר הפגישה'>
            <div className={style.meeting_card}>
                <div className={style.icon_part}>
                    <div className={style.icon_container}>
                        <img src="/icons/meeting-icon.png" alt="meeting" />
                    </div>
                </div>
                <div className={style.content_part}>
                    <h2>{meetingTitle}</h2>
                    <div className={style.card_flex}>
                        <div className={style.details_right}>
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
                        </div>
                        <div className={style.summary}>
                            <p>{meetingSummary}</p>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}
