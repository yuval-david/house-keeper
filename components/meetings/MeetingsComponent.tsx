import React, { useEffect, useState } from 'react'
import { ButtonAddItem } from '../UI/ButtonAddItem'
import style from "./MeetingsComponent.module.css"
import { MeetingCard } from './MeetingCard'
import { Meeting } from '@/Types/objects_types';

export function MeetingsComponent() {
    // Hardcoded - need to come from store after login
    const buildingID = 1;
    const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
    const meetingsEndpoint = apiEndpoint + `/v1/buildings/${buildingID}/meetings`;

    const [meetings, setMeetings] = useState<Meeting[] | null>(null);
    const [isLoading, setLoading] = useState(false);

    // Fetch Meetings
    useEffect(() => {
        setLoading(true);
        fetch(meetingsEndpoint)
            .then((res) => res.json())
            .then((data) => {
                setMeetings(data.meetings);
                setLoading(false);
            }).catch(err => { console.log(err); setLoading(false) });
    }, []);

    if (isLoading) return <p>Loading...</p>;
    if (!meetings) return <p>Missing data about meetings</p>;

    return (
        <div>
            <ButtonAddItem buttonLink="/meetings/add-meeting" buttonText='להוספת פגישה חדשה' />
            <div className={style.meetings_cards_container}>
                {meetings.length > 0 && meetings.map((meetingItem) => {
                    return (
                        <MeetingCard key={meetingItem.id} id={meetingItem.id} name={meetingItem?.name} date={meetingItem.date} time={meetingItem.time} location={meetingItem.location} description={meetingItem?.description} />
                    )
                })}

            </div>
        </div>
    )
}
