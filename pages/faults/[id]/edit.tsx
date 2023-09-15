import { PageLayout } from '@/components/UI/PageLayout'
import React, { useState } from 'react'
import style from "../../../styles/AddFault.module.css"
import { CustomInputRow } from '@/components/UI/FormFields/CustomInputRow';
import { ButtonSave } from '@/components/UI/ButtonSave';
import { Loader } from '@/components/UI/Loader';
import { faultTypes, faultUrgencyLevels, faultStatuses, faultDoneBySupplier } from "@/components/faults/FalutsFieldsOptions"
import { useRouter } from 'next/router';
import { Fault, FaultStatus, FaultType, FaultUrgency } from '@/Types/objects_types';

// DEMO DATA (will be fetched by fault id)
const EditedFault: Fault = {
    id: 1,
    faultName: "נזילה בגג",
    faultType: "חמורה",
    faultUrgency: "דחופה",
    faultLocation: "גג הבניין",
    faultStatus: "לא טופלה",
}


export default function EditPage() {

    const router = useRouter();
    const { id: faultId } = router.query;

    const [isLoadingAddFault, setIsLoadingAddFault] = useState<boolean>(false);
    const [faultName, setFaultName] = useState<string>(EditedFault?.faultName || "");
    const [faultType, setFaultType] = useState<FaultType>(EditedFault?.faultType || "");
    const [faultUrgency, setFaultUrgency] = useState<FaultUrgency>(EditedFault?.faultUrgency || "");
    const [faultLocation, setFaultLocation] = useState<string>(EditedFault?.faultLocation || "");
    const [faultStatus, setFaultStatus] = useState<FaultStatus>(EditedFault?.faultStatus || "");
    const [doneBy, setDoneBy] = useState<string>(EditedFault?.doneBy || "");
    const [isSupplierInvolved, setIsSupplierInvolved] = useState<string>(EditedFault?.isSupplierInvolved || "");
    const [faultPrice, setFaultPrice] = useState<number>(EditedFault?.faultPrice || 0);
    const [faultImage, setFaultImage] = useState(EditedFault?.faultImage || ""); // Need to check how to implement image

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setIsLoadingAddFault(true);
        const data = {
            id: faultId,
            faultName,
            faultType,
            faultUrgency,
            faultLocation,
            faultStatus,
            doneBy,
            supplierInvolved: isSupplierInvolved === "כן" || false,
            price: typeof faultPrice === "string" ? parseInt(faultPrice) : faultPrice,
            faultImage, // check how to upload file
        }
        console.log("Submitted form data:", data);
        setIsLoadingAddFault(false);
    }

    return (
        <PageLayout pageTitle='עריכת תקלה'>
            <form className={style.form} onSubmit={handleSubmit}>
                <div className={style.fault_card}>
                    <div className={style.icon_part}>
                        <div className={style.icon_container}>
                            <img src="/icons/meeting-icon.png" alt="meeting" />
                        </div>
                    </div>
                    <div className={style.content_part}>
                        <h2>פרטי תקלה</h2>
                        <div className={style.details_list}>
                            <CustomInputRow value={faultName} onChange={(e) => setFaultName(e.target.value)} label='שם התקלה' placeholder='' type='text' dir='rtl' required />
                            <CustomInputRow value={faultType} onChange={(e) => setFaultType(e.target.value)} label='סוג התקלה' placeholder='' type='select' dir='rtl' required options={faultTypes} />
                            <CustomInputRow value={faultUrgency} onChange={(e) => setFaultUrgency(e.target.value)} label='רמת דחיפות' placeholder='' type='select' dir='rtl' required options={faultUrgencyLevels} />
                            <CustomInputRow value={faultLocation} onChange={(e) => setFaultLocation(e.target.value)} label='מיקום' placeholder='' type='text' dir='rtl' required />
                            <CustomInputRow value={faultStatus} onChange={(e) => setFaultStatus(e.target.value)} label='סטטוס' placeholder='' type='radio' dir='rtl' required options={faultStatuses} />
                            {
                                faultStatus === "טופלה" && (
                                    <div className={style.details_done_fault}>
                                        <CustomInputRow value={doneBy} onChange={(e) => setDoneBy(e.target.value)} label='טופלה ע"י' placeholder='' type='text' dir='rtl' required />
                                        <CustomInputRow value={isSupplierInvolved} onChange={(e) => setIsSupplierInvolved(e.target.value)} label='תיקון כלל התערבות ספק' placeholder='' type='radio' dir='rtl' options={faultDoneBySupplier} required />
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
