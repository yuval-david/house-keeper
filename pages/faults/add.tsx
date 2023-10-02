import { PageLayout } from '@/components/UI/PageLayout'
import React, { useState } from 'react'
import style from "../../styles/AddFault.module.css"
import { ButtonSave } from '@/components/UI/ButtonSave';
import { Loader } from '@/components/UI/Loader';
import { CustomInputRow } from '@/components/UI/FormFields/CustomInputRow';
import { faultTypes, faultUrgencyLevels, faultStatuses } from "@/components/faults/FalutsFieldsOptions"
import { AddFaultRequest, FaultSeveriry, FaultStatus, FaultUrgency } from '@/Types/objects_types';
import { ModalMessage } from '@/components/UI/Modals/ModalMessage';
import { useRouter } from 'next/router';
import { userStore } from '@/stores/UserStore';

export default function AddFaultPage() {

    const router = useRouter();

    // Get User details
    const { is_vahadbait, building_id } = userStore();
    const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
    const faultEndpoint = `${apiEndpoint}/v2/buildings/${building_id}/faults`;


    const [isLoadingAddFault, setIsLoadingAddFault] = useState<boolean>(false);
    const [successModal, setSuccessModal] = useState(false);
    const [errorModal, setErrorModal] = useState(false);
    const [faultName, setFaultName] = useState<string>("");
    const [faultSeveriry, setFaultSeveriry] = useState<FaultSeveriry>("");
    const [faultUrgency, setFaultUrgency] = useState<FaultUrgency>("");
    const [faultLocation, setFaultLocation] = useState<string>("");
    const [faultStatus, setFaultStatus] = useState<FaultStatus>("");
    const [doneBy, setDoneBy] = useState<string>("");
    const [isSupplierInvolved, setIsSupplierInvolved] = useState<string>("");
    const [faultPrice, setFaultPrice] = useState<number>(0);
    const [faultImage, setFaultImage] = useState(""); // Need to check how to implement image

    // Message Modal Functions
    const handleCloseSuccessModal = () => {
        setSuccessModal(false);
        router.push("/faults");
    }
    const handleCloseErrorModal = () => {
        setErrorModal(false);
    }

    // Submit add fault form
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setIsLoadingAddFault(true);

        const data: AddFaultRequest = {
            name: faultName,
            severity: faultSeveriry,
            urgency: faultUrgency,
            location: faultLocation,
            status: faultStatus === "טופלה",
        }

        if (faultStatus === "טופלה") {
            data.handledby = doneBy;
            data.vendor = isSupplierInvolved === "כן";
            data.price = typeof faultPrice === "string" ? parseInt(faultPrice) : faultPrice;
        }


        try {
            const response: any = await fetch(faultEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });
            const resJson = await response.json();
            setIsLoadingAddFault(false);
            if (response.ok) {
                setSuccessModal(true);
            }
        } catch (error: any) {
            console.log(error);
            setIsLoadingAddFault(false);
            setErrorModal(true);
        }


    }

    return (
        <PageLayout pageTitle='הוספת תקלה חדשה'>
            <form className={style.form} onSubmit={handleSubmit}>
                <div className={style.fault_card}>
                    <div className={style.icon_part}>
                        <div className={style.icon_container}>
                            <img src="/icons/fault-icon.png" alt="meeting" />
                        </div>
                    </div>
                    <div className={style.content_part}>
                        <h2>פרטי תקלה חדשה</h2>
                        <div className={style.details_list}>
                            <CustomInputRow value={faultName} onChange={(e) => setFaultName(e.target.value)} label='שם התקלה' placeholder='' type='text' dir='rtl' required />
                            <CustomInputRow value={faultSeveriry} onChange={(e) => setFaultSeveriry(e.target.value)} label='סוג התקלה' placeholder='' type='select' dir='rtl' required options={faultTypes} />
                            <CustomInputRow value={faultUrgency} onChange={(e) => setFaultUrgency(e.target.value)} label='רמת דחיפות' placeholder='' type='select' dir='rtl' required options={faultUrgencyLevels} />
                            <CustomInputRow value={faultLocation} onChange={(e) => setFaultLocation(e.target.value)} label='מיקום' placeholder='' type='text' dir='rtl' required />
                            <CustomInputRow value={faultStatus} onChange={(e) => setFaultStatus(e.target.value)} label='סטטוס' placeholder='' type='radio' dir='rtl' required options={faultStatuses} />
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
            <ModalMessage isOpen={successModal} handleClose={handleCloseSuccessModal} message="התקלה נוספה בהצלחה" buttonText='אישור' type='success' />
            <ModalMessage isOpen={errorModal} handleClose={handleCloseErrorModal} message="ישנה שגיאה בהוספת התקלה, אנא נסו שוב." buttonText='אישור' type='error' />
        </PageLayout>
    )
}
