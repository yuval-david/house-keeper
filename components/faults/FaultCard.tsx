import React from 'react'
import style from "./FaultCard.module.css"
import { ButtonEditItem } from '../UI/ButtonEditItem'
import { Fault, FaultSeveriry } from '@/Types/objects_types';
import { userStore } from '@/stores/UserStore';

// TODO: Add Props with real data
export function FaultCard({
    id,
    faultData,
}: {
    id: number;
    faultData: Fault;
}) {

    // Get User Details
    const { is_vahadbait, is_management_company, building_id } = userStore();
    const { name, severity, urgency, status, location, handledby, price } = faultData;
    const statusText = status ? "טופלה" : "לא טופלה";

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
                        {" "}{name}
                    </h2>
                    <div className={style.details_list}>
                        <div className={style.detail}>
                            <span className={style.label}>סוג:</span>
                            <span> {severity}</span>
                        </div>
                        <div className={style.detail}>
                            <span className={style.label}>רמת חשיבות:</span>
                            <span> {urgency}</span>
                        </div>
                        <div className={style.detail}>
                            <span className={style.label}>מיקום:</span>
                            <span> {location}</span>
                        </div>
                        <div className={style.detail}>
                            <span className={style.label}>סטטוס:</span>
                            <span>  {statusText}</span>
                        </div>
                        {statusText === "טופלה" && (
                            <>
                                <div className={style.detail}>
                                    <span className={style.label}>טופלה ע"י:</span>
                                    <span> {handledby}</span>
                                </div>
                                <div className={style.detail}>
                                    <span className={style.label}>מחיר:</span>
                                    <span> {price}</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className={style.more_details}>
                    {(is_vahadbait || is_management_company) && <ButtonEditItem buttonLink={`/faults/${id}/edit`} buttonText='לעריכה לחצו כאן' />}
                    <div className={style.fault_img_container}>
                        <img
                            src={`/faults/${building_id}/${id}/img.jpg`}
                            onError={(e: any) => { e.target.onError = null; e.target.src = "/icons/preview_img.svg" }}
                            alt="fault image" />

                    </div>
                </div>
            </div>
        </div>
    )
}
