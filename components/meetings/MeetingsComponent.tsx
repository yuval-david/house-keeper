import React, { useEffect, useState } from 'react'
import { ButtonAddItem } from '../UI/ButtonAddItem'
import style from "./MeetingsComponent.module.css"
import { MeetingCard } from './MeetingCard'
import { Meeting } from '@/Types/objects_types';

export function MeetingsComponent() {
    const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
    const meetingsEndpoint = apiEndpoint + "/v1/buildings/1/meetings";

    const [meetings, setMeetings] = useState<Meeting[] | null>(null);
    const [isLoading, setLoading] = useState(false);

    // Fetch Meetings
    useEffect(() => {
        setLoading(true);
        fetch(meetingsEndpoint)
            .then((res) => res.json())
            .then((data) => {
                setMeetings(data.results);
                setLoading(false);
            }).catch(err => { console.log(err); setLoading(false) });
    }, []);

    // if (isLoading) return <p>Loading...</p>;
    // if (!meetings) return <p>Missing data about meetings</p>;
    console.log(meetings);

    return (
        <div>
            <ButtonAddItem buttonLink="/meetings/add-meeting" buttonText='להוספת פגישה חדשה' />
            <div className={style.meetings_cards_container}>
                {/* {meetings.length > 0 && meetings.map((meetingItem, index) => {
                    return (
                        <MeetingCard key={index} />
                    )
                })} */}
                <MeetingCard />
                <MeetingCard />
                <MeetingCard />

            </div>
        </div>
    )
}
