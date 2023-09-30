import { PageLayout } from '@/components/UI/PageLayout'
import React, { useEffect, useMemo, useState } from 'react'
import style from "../../../styles/AddFault.module.css"
import { CustomInputRow } from '@/components/UI/FormFields/CustomInputRow';
import { ButtonSave } from '@/components/UI/ButtonSave';
import { Loader } from '@/components/UI/Loader';
import { faultTypes, faultUrgencyLevels, faultStatuses, faultDoneBySupplier } from "@/components/faults/FalutsFieldsOptions"
import { useRouter } from 'next/router';
import { Fault, FaultStatus, FaultSeveriry, FaultUrgency, editFaultRequest } from '@/Types/objects_types';
import { ModalMessage } from '@/components/UI/Modals/ModalMessage';


export default function EditPage() {

    // Hardcoded - need to come from store after login
    const buildingID = 1;
    const router = useRouter();
    const { id: faultId } = router.query;
    const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;

    const faultEndpoint = useMemo(() => {
        return apiEndpoint + `/v2/buildings/${buildingID}/faults/${faultId}`;
    }, [buildingID, faultId]);


    const [isLoadingFaultData, setIsLoadingFaultData] = useState<boolean>(false);
    const [isLoadingEditFault, setIsLoadingEditFault] = useState<boolean>(false);
    const [faultName, setFaultName] = useState("");
    const [faultType, setFaultType] = useState<FaultSeveriry>();
    const [faultUrgency, setFaultUrgency] = useState<FaultUrgency>();
    const [faultLocation, setFaultLocation] = useState<string>();
    const [faultStatus, setFaultStatus] = useState<FaultStatus>();
    const [doneBy, setDoneBy] = useState<string>();
    const [isSupplierInvolved, setIsSupplierInvolved] = useState<string>();
    const [faultPrice, setFaultPrice] = useState<number>();
    const [faultImage, setFaultImage] = useState(); // Need to check how to implement image
    const [successModal, setSuccessModal] = useState(false);
    const [errorModal, setErrorModal] = useState(false);
    const [originalFaultData, setOriginalFaultData] = useState<Fault>();


    const handleCloseSuccessModal = () => {
        setSuccessModal(false);
    }
    const handleCloseErrorModal = () => {
        setErrorModal(false);
    }

    // Fetch Fault Data
    useEffect(() => {
        if (faultId) {
            setIsLoadingFaultData(true);
            fetch(faultEndpoint)
                .then((res) => res.json())
                .then((data) => {
                    setIsLoadingFaultData(false);
                    setOriginalFaultData(data.fault);
                    console.log("data.fault: ", data.fault);
                    // Set form values
                    setFaultName(data.fault.name);
                    setFaultType(data.fault.severity);
                    setFaultUrgency(data.fault.urgency);
                    setFaultLocation(data.fault.location);
                    setFaultStatus(data.fault.status ? "טופלה" : "לא טופלה");
                    setDoneBy(data.fault.handledby);
                    setIsSupplierInvolved(data.fault.vendor ? "כן" : "לא");
                    setFaultPrice(data.fault.price);

                }).catch(err => {
                    setIsLoadingFaultData(false);
                    console.log(err);
                });
        }
    }, [faultId]);

    // Handle submit edit-fault form
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setIsLoadingEditFault(true);

        const data: editFaultRequest = {
            id: parseInt(faultId as string),
        }

        // Check updates
        if (faultName !== originalFaultData?.name) {
            data.name = faultName;
        }
        if (faultType !== originalFaultData?.severity) {
            data.severity = faultType;
        }
        if (faultUrgency !== originalFaultData?.urgency) {
            data.urgency = faultUrgency;
        }
        if (faultLocation !== originalFaultData?.location) {
            data.location = faultLocation;
        }
        const originalStatus = originalFaultData?.status ? "טופלה" : "לא טופלה";
        if (faultStatus !== originalStatus) {
            data.status = faultStatus === "טופלה";
        }
        if (doneBy !== originalFaultData?.handledby) {
            data.handledby = doneBy;
        }
        const originalIsVendor = originalFaultData?.vendor ? "כן" : "לא";
        if (isSupplierInvolved !== originalIsVendor) {
            data.vendor = isSupplierInvolved === "כן";
        }
        if (faultPrice !== originalFaultData?.price) {
            data.price = faultPrice;
        }


        if (faultId) {
            try {
                const response: any = await fetch(faultEndpoint, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data)
                });
                const resJson = await response.json();
                setIsLoadingEditFault(false);
                if (response.ok) {
                    setSuccessModal(true);
                }
            } catch (error: any) {
                console.log(error);
                setIsLoadingEditFault(false);
                setErrorModal(true);
            }
        }
    }

    if (isLoadingFaultData) return (
        <PageLayout pageTitle='עריכת תקלה'>
            <Loader isShadow={false} message='טוען פרטי תקלה...' />
        </PageLayout>
    );


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
            {isLoadingEditFault && <Loader />}
            <ModalMessage isOpen={successModal} handleClose={handleCloseSuccessModal} message="פרטי התקלה עודכנו בהצלחה" buttonText='אישור' type='success' />
            <ModalMessage isOpen={errorModal} handleClose={handleCloseErrorModal} message="ישנה שגיאה בעריכת פרטי התקלה, אנא נסו שוב." buttonText='אישור' type='error' />
        </PageLayout>
    )
}
