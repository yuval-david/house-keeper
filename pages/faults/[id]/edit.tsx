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
import { userStore } from '@/stores/UserStore';
import { UploadedFile } from '../add';
import axios from 'axios';


export default function EditPage() {

    // Get User details
    const { building_id, is_vahadbait, is_management_company } = userStore();
    const router = useRouter();
    const { id: faultId } = router.query;
    const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;

    const faultEndpoint = useMemo(() => {
        return apiEndpoint + `/v2/buildings/${building_id}/faults/${faultId}`;
    }, [building_id, faultId]);
    const faultsEndpoint = useMemo(() => {
        return apiEndpoint + `/v2/buildings/${building_id}/faults`;
    }, [building_id]);
    const updatesEndpoint = useMemo(() => {
        return apiEndpoint + `/v2/buildings/${building_id}/updates`;
    }, [building_id]);


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
    const [faultImageValue, setFaultImageValue] = useState(); // For input value only
    const [selectedFile, setSelectedFile] = useState<UploadedFile | any>();
    const [successModal, setSuccessModal] = useState(false);
    const [errorModal, setErrorModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState("פרטי התקלה עודכנו בהצלחה");
    const [originalFaultData, setOriginalFaultData] = useState<Fault>();


    const handleCloseSuccessModal = () => {
        setSuccessModal(false);
        router.reload();
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

        if (!(is_vahadbait || is_management_company)) {
            alert("User not allowed to edit fault.");
            setIsLoadingEditFault(false);
            return;
        }

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
                    if (response.ok) {
                        uploadImage(parseInt(faultId as string));
                    }
                    setSuccessModal(true);
                    if (faultStatus === "טופלה") {
                        setSuccessMessage("פרטי התקלה עודכנו בהצלחה! נשלח לדיירים עדכון על הטיפול בתקלה.");
                        handleClickSendUpdate();
                    };
                }
            } catch (error: any) {
                console.log(error);
                setIsLoadingEditFault(false);
                setErrorModal(true);
            }
        }
    }


    const handleClickSendUpdate = async () => {

        if (!building_id) alert("User not allowed, missing building code.");

        const data = {
            type: "fault",
            item_id: faultId,
            item_name: faultName,
            item_date: null
        };

        const response = await fetch(updatesEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

    }


    // handle change file input
    const handleChangeFile = (event: any) => {
        setFaultImageValue(event.target.value);

        const file = event.target.files[0];
        setSelectedFile(file);
    }

    // Upload fault image
    const uploadImage = async (faultId: number) => {
        if (!selectedFile) return;

        const formdata = new FormData();
        formdata.append("fault_img", selectedFile);

        const endpointUpload = faultsEndpoint + `/${faultId}/image`;

        try {
            const { data } = await axios.post(endpointUpload, formdata);
        } catch (error: any) {
            console.log(error.response?.data);
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
                            <CustomInputRow value={faultImageValue || ""} onChange={handleChangeFile} label='תמונה' placeholder='' type='file' dir='rtl' fileTypesAccept='image/*' />
                            {faultImageValue &&
                                <span>
                                    התמונה תחליף את התמונה הנוכחית.
                                </span>
                            }
                            <div className={style.fault_img_container}>
                                <img
                                    src={`/faults/${building_id}/${faultId}/img.jpg`}
                                    onError={(e: any) => { e.target.onError = null; e.target.src = "/icons/preview_img.svg" }}
                                    alt="fault image" />

                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.fault_save_btn}>
                    <ButtonSave text='לחץ לשמירה' type='submit' />
                </div>
            </form>
            {isLoadingEditFault && <Loader />}
            <ModalMessage isOpen={successModal} handleClose={handleCloseSuccessModal} message={successMessage} buttonText='אישור' type='success' />
            <ModalMessage isOpen={errorModal} handleClose={handleCloseErrorModal} message="ישנה שגיאה בעריכת פרטי התקלה, אנא נסו שוב." buttonText='אישור' type='error' />
        </PageLayout >
    )
}
