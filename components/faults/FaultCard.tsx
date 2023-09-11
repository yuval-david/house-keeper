import React from 'react'
import style from "./FaultCard.module.css"

export function FaultCard() {
    return (
        <div className={style.fault_card}>
            <div className={style.icon_part}>
                <div className={style.icon_container}>
                    <img src="/icons/fault-icon.png" alt="fault" />
                </div>
            </div>
            <div className={style.content_part}>

            </div>
        </div>
    )
}
