import React from 'react'
import { ButtonAddItem } from '../UI/ButtonAddItem'
import style from "./FaultsComponent.module.css"
import { FaultCard } from './FaultCard'
import { Fault } from '@/Types/objects_types'

const faults: Fault[] = [
    {
        id: 1,
        faultName: "נזילה בגג",
        faultType: "בינונית",
        faultUrgency: "דחופה",
        faultLocation: "גג הבניין",
        faultStatus: "לא טופלה",
    },
    {
        id: 2,
        faultName: "צבע דהוי",
        faultType: "קלה",
        faultUrgency: "לא דחופה",
        faultLocation: "חדר מדרגות",
        faultStatus: "לא טופלה",
    },
    {
        id: 3,
        faultName: "מדרגה שבורה",
        faultType: "חמורה",
        faultUrgency: "דחופה",
        faultLocation: "חדר מדרגות",
        faultStatus: "לא טופלה",
    },
    {
        id: 4,
        faultName: "ידית תקולה",
        faultType: "בינונית",
        faultUrgency: "לא דחופה",
        faultLocation: "כניסה לבניין",
        faultStatus: "טופלה",
    }
]

export function FaultsComponent() {
    return (
        <div>
            <ButtonAddItem buttonLink="/faults/add" buttonText='להוספת תקלה חדשה' />
            <div className={style.faults_cards_container}>
                {
                    faults.length > 0 && faults.map((faultItem) => (
                        <FaultCard id={faultItem.id} faultName={faultItem.faultName} />
                    ))
                }
            </div>
        </div>
    )
}
