import React, { useEffect, useState } from 'react'
import { ButtonAddItem } from '../UI/ButtonAddItem'
import style from "./MeetingsComponent.module.css"
import { MeetingCard } from './MeetingCard'
import { Meeting } from '@/Types/objects_types';
import { Loader } from '../UI/Loader';
import { userStore } from '@/stores/UserStore';

export function MeetingsComponent() {

    // Get User details
    const { is_vahadbait, building_id } = userStore();
    const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
    const meetingsEndpoint = apiEndpoint + `/v2/buildings/${building_id}/meetings`;

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
            }).catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    if (isLoading) return <Loader isShadow={false} message="טוען פגישות דיירים..." />;
    if (!meetings) return <p>לא נמצאו פגישות.</p>;

    return (
        <div>
            {is_vahadbait && <ButtonAddItem buttonLink="/meetings/add-meeting" buttonText='להוספת פגישה חדשה' />}
            <div className={style.meetings_cards_container}>
                {meetings.length > 0 && meetings.map((meetingItem) => {
                    return (
                        <MeetingCard key={meetingItem.id} id={meetingItem.id} users={meetingItem?.users || []} name={meetingItem?.name} date={meetingItem.date} time={meetingItem.time} location={meetingItem.location} description={meetingItem?.description} isSummary={!!(meetingItem?.summary)} />
                    )
                })}

            </div>
        </div>
    )
}
