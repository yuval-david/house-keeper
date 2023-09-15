import { PageLayout } from '@/components/UI/PageLayout'
import React, { useState } from 'react'
import style from "../../styles/AddFault.module.css"
import { ButtonSave } from '@/components/UI/ButtonSave';
import { Loader } from '@/components/UI/Loader';
import { CustomInputRow } from '@/components/UI/FormFields/CustomInputRow';


const faultTypes: string[] = ["חמורה", "בינונית", "קלה"];
const faultUrgencyLevels: string[] = ["דחופה", "לא דחופה"];
const faultStatuses: string[] = ["טופלה", "לא טופלה"];

export default function AddFaultPage() {

    const [isLoadingAddFault, setIsLoadingAddFault] = useState(false);
    const [faultName, setFaultName] = useState("");
    const [faultType, setFaultType] = useState("");
    const [faultUrgency, setFaultUrgency] = useState("");
    const [faultLocation, setFaultLocation] = useState("");
    const [faultStatus, setFaultStatus] = useState("");
    const [doneBy, setDoneBy] = useState("");
    const [isSupplierInvolved, setIsSupplierInvolved] = useState(false);
    const [faultPrice, setFaultPrice] = useState(0);
    const [faultImage, setFaultImage] = useState(""); // Need to check how to implement image

    const handleSubmit = async (event: any) => {
        console.log("Submit form");
    }

    console.log("faultStatus: ", faultStatus);

    return (
        <PageLayout pageTitle='הוספת תקלה חדשה'>
            <form className={style.form} onSubmit={handleSubmit}>
                <div className={style.fault_card}>
                    <div className={style.icon_part}>
                        <div className={style.icon_container}>
                            <img src="/icons/meeting-icon.png" alt="meeting" />
                        </div>
                    </div>
                    <div className={style.content_part}>
                        <h2>פרטי תקלה חדשה</h2>
                        <div className={style.details_list}>
                            <CustomInputRow value={faultName} onChange={(e) => setFaultName(e.target.value)} label='שם התקלה' placeholder='' type='text' dir='rtl' required />
                            <CustomInputRow value={faultType} onChange={(e) => setFaultType(e.target.value)} label='סוג התקלה' placeholder='' type='select' dir='rtl' required options={faultTypes} />
                            <CustomInputRow value={faultUrgency} onChange={(e) => setFaultUrgency(e.target.value)} label='רמת דחיפות' placeholder='' type='select' dir='rtl' required options={faultUrgencyLevels} />
                            <CustomInputRow value={faultLocation} onChange={(e) => setFaultLocation(e.target.value)} label='מיקום התקלה' placeholder='' type='text' dir='rtl' required />
                            <CustomInputRow value={faultStatus} onChange={(e) => setFaultStatus(e.target.value)} label='סטטוס התקלה' placeholder='' type='radio' dir='rtl' required options={faultStatuses} />
                            {
                                faultStatus === "טופלה" && (
                                    <div className={style.details_done_fault}>
                                        <CustomInputRow value={doneBy} onChange={(e) => setDoneBy(e.target.value)} label='טופלה ע"י' placeholder='' type='text' dir='rtl' required />
                                        <CustomInputRow value={isSupplierInvolved} onChange={(e) => setIsSupplierInvolved(e.target.value)} label='תיקון כלל התערבות ספק' placeholder='' type='radio' dir='rtl' options={["כן", "לא"]} required />
                                        <CustomInputRow value={faultPrice} onChange={(e) => setFaultPrice(e.target.value)} label='מחיר תיקון' placeholder='' type='number' dir='rtl' required />
                                    </div>
                                )
                            }
                            <CustomInputRow value={faultImage} onChange={(e) => setFaultImage(e.target.value)} label='תמונה' placeholder='' type='file' dir='rtl' fileTypesAccept='image/*' />
                        </div>
                    </div>
                </div>
                <div className={style.fault_save_btn}>
                    <ButtonSave text='לחץ לשמירה' type='submit' />
                </div>
            </form>
            {isLoadingAddFault && <Loader />}
        </PageLayout>
    )
}
