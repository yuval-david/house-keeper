import React from 'react'
import style from "./FaultCard.module.css"
import { ButtonEditItem } from '../UI/ButtonEditItem'

// TODO: Add Props with real data
export function FaultCard() {
    return (
        <div className={style.fault_card}>
            <div className={style.icon_part}>
                <div className={style.icon_container}>
                    <img src="/icons/fault-icon.png" alt="fault" />
                </div>
            </div>
            <div className={style.content_part}>
                <div className={style.maih_details}>
                    <h2>
                        <span>תקלה</span>:
                        שריפת נורות
                    </h2>
                    <div className={style.details_list}>
                        <div className={style.detail}>
                            <span className={style.label}>סוג:</span>
                            <span> קלה</span>
                        </div>
                        <div className={style.detail}>
                            <span className={style.label}>רמת חשיבות:</span>
                            <span> לא דחופה</span>
                        </div>
                        <div className={style.detail}>
                            <span className={style.label}>סטטוס:</span>
                            <span>  פתוחה</span>
                        </div>
                        <div className={style.detail}>
                            <span className={style.label}>כתובת:</span>
                            <span> משמר הירדן 11, נס ציונה</span>
                        </div>
                        <div className={style.detail}>
                            <span className={style.label}>מיקום:</span>
                            <span> לובי</span>
                        </div>
                    </div>
                </div>
                <div className={style.more_details}>
                    <ButtonEditItem buttonLink='/faults/1/edit' buttonText='לעריכה לחצו כאן' />
                    <div className={style.fault_img_container}>
                        <img src="/icons/preview_img.svg" alt="fault image" />
                        {/** TODO: Add condition with the real picture **/}
                    </div>
                </div>
            </div>
        </div>
    )
}
