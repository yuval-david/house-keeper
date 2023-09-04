import React from 'react'
import { ButtonAddItem } from '../UI/ButtonAddItem'
import style from "./MeetingsComponent.module.css"
import { MeetingCard } from './MeetingCard'

export function MeetingsComponent() {
    return (
        <div>
            <ButtonAddItem buttonLink="/meetings/add-meeting" buttonText='להוספת פגישה חדשה' />
            <div className={style.meetings_cards_container}>
                <MeetingCard />
                <MeetingCard />
                <MeetingCard />
                <MeetingCard />
                <MeetingCard />
                <MeetingCard />
            </div>
        </div>
    )
}
