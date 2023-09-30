import { PageLayout } from '@/components/UI/PageLayout'
import React, { useState } from 'react'
import style from "../../styles/AddSupplier.module.css"
import { CustomInputRow } from '@/components/UI/FormFields/CustomInputRow'
import { ButtonSave } from '@/components/UI/ButtonSave';
import { useRouter } from 'next/router';
import { ModalMessage } from '@/components/UI/Modals/ModalMessage';
import { Loader } from '@/components/UI/Loader';

export interface createSupplierRequest {
    fullname: string;
    role: string;
    phone: number | null;
    building_id: number;
}

export default function AddSupplierPage() {

    const router = useRouter();

    // Hardcoded for now
    const building_id = 1;
    const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
    const contractorsEndpoint = apiEndpoint + `/v2/buildings/${building_id}/managment/contractors`;

    // Form values states
    const [fullname, setFullName] = useState("");
    const [role, setRole] = useState("");
    const [phone, setPhone] = useState(null);

    // Loading & Error states 
    const [isLoadingAdd, setIsLoadingAdd] = useState<boolean>(false);
    const [successModal, setSuccessModal] = useState(false);
    const [errorModal, setErrorModal] = useState(false);

    const handleCloseSuccessModal = () => {
        setSuccessModal(false);
        router.push("/suppliers");
    }
    const handleCloseErrorModal = () => {
        setErrorModal(false);
    }

    // Handle submit add suppllier (contractor) form
    const handleSubmitForm = async (event: any) => {
        event.preventDefault();
        setIsLoadingAdd(true);

        const data: createSupplierRequest = {
            fullname,
            role,
            phone,
            building_id
        };

        try {
            const response: any = await fetch(contractorsEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const resJson = await response.json();
            setIsLoadingAdd(false);
            if (response.ok) {
                setSuccessModal(true);
            }
        } catch (error: any) {
            setIsLoadingAdd(false);
            setErrorModal(true);
            console.log(error);
        }

    }

    return (
        <PageLayout pageTitle='הוספת ספק'>
            <form className={style.form} onSubmit={handleSubmitForm}>
                <div className={style.details_list}>
                    <CustomInputRow type='text' label='שם מלא' value={fullname} onChange={e => setFullName(e.target.value)} required dir='rtl' />
                    <CustomInputRow type='text' label='תפקיד' value={role} onChange={e => setRole(e.target.value)} required dir='rtl' />
                    <CustomInputRow maxLength={10} type='tel' label='טלפון' value={phone} onChange={e => setPhone(e.target.value)} required dir='ltr' />
                </div>

                <div className={style.btn_container}>
                    <ButtonSave type='submit' text='הוספה' />
                </div>
            </form>
            <ModalMessage isOpen={successModal} handleClose={handleCloseSuccessModal} message="הספק נוסף בהצלחה" buttonText='אישור' type='success' />
            <ModalMessage isOpen={errorModal} handleClose={handleCloseErrorModal} message="ישנה שגיאה בהוספת הספק, אנא נסו שוב." buttonText='אישור' type='error' />
            {isLoadingAdd && <Loader />}
        </PageLayout>
    )
}
