import { PageLayout } from '@/components/UI/PageLayout'
import React, { useState } from 'react'
import style from "../../styles/AddSupplier.module.css"
import { CustomInputRow } from '@/components/UI/FormFields/CustomInputRow'
import { ButtonSave } from '@/components/UI/ButtonSave';
import { useRouter } from 'next/router';

export interface createSupplierRequest {
    fullName: string;
    role: string;
    phone: number | null;
}

export default function AddSupplierPage() {

    const router = useRouter();

    // Form values states
    const [fullName, setFullName] = useState("");
    const [role, setRole] = useState("");
    const [phone, setPhone] = useState(null);

    const handleSubmitForm = (event: any) => {
        event.preventDefault();

        const data: createSupplierRequest = {
            fullName,
            role,
            phone
        };

        console.log("Submit data: ", data);

        alert("הספק נוסף בהצלחה");
        router.push("/suppliers");

    }

    return (
        <PageLayout pageTitle='הוספת ספק'>
            <form className={style.form} onSubmit={handleSubmitForm}>
                <div className={style.details_list}>
                    <CustomInputRow type='text' label='שם מלא' value={fullName} onChange={e => setFullName(e.target.value)} required dir='rtl' />
                    <CustomInputRow type='text' label='תפקיד' value={role} onChange={e => setRole(e.target.value)} required dir='rtl' />
                    <CustomInputRow maxLength={10} type='tel' label='טלפון' value={phone} onChange={e => setPhone(e.target.value)} required dir='ltr' />
                </div>

                <div className={style.btn_container}>
                    <ButtonSave type='submit' text='הוספה' />
                </div>
            </form>
        </PageLayout>
    )
}
