import React from 'react'
import { ButtonAddItem } from '../UI/ButtonAddItem'
import style from "./FaultsComponent.module.css"
import { FaultCard } from './FaultCard'

export function FaultsComponent() {
    return (
        <div>
            <ButtonAddItem buttonLink="/faults/add" buttonText='להוספת תקלה חדשה' />
            <div className={style.faults_cards_container}>
                <FaultCard />
                <FaultCard />
                <FaultCard />
            </div>
        </div>
    )
}
