import { PageLayout } from '@/components/UI/PageLayout'
import React, { useState } from 'react'
import style from "../../styles/AddCompanyDetails.module.css"
import { CustomInputRow } from '@/components/UI/FormFields/CustomInputRow';
import { ButtonSave } from '@/components/UI/ButtonSave';
import { Loader } from '@/components/UI/Loader';

export default function AddDetailsPage() {
    const [isLoadingAddDetails, setIsLoadingAddDetails] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [representativeName, setRepresentativeName] = useState<string>("");
    const [phone, setPhone] = useState<number | undefined>(undefined);
    const [email, setEmail] = useState<string>("");
    const [paymentName, setPaymentName] = useState<string>("");
    const [paymentAccountNumber, setPaymentAccountNumber] = useState<number | undefined>(undefined);
    const [paymentBankName, setPaymentBankName] = useState<string>("");
    const [paymentBranch, setPaymentBranch] = useState<string>("");



    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setIsLoadingAddDetails(true);
        const data = {
            name,
            representativeName,
            phone,
            email,
            paymentName,
            paymentAccountNumber,
            paymentBankName,
            paymentBranch
        }
        console.log("Submitted form data:", data);
        setIsLoadingAddDetails(false);
    }

    return (
        <PageLayout pageTitle='הוספת פרטי חברת ניהול'>
            <form className={style.form} onSubmit={handleSubmit}>
                <div className={style.company_card}>
                    <div className={style.content_part}>
                        <h2>פרטי חברת ניהול חדשה</h2>
                        <div className={style.details_list}>
                            <CustomInputRow value={name} onChange={(e) => setName(e.target.value)} label='שם חברת הניהול' placeholder='' type='text' dir='rtl' required />
                            <CustomInputRow value={representativeName} onChange={(e) => setRepresentativeName(e.target.value)} label='שם הנציג' placeholder='' type='text' dir='rtl' required />
                            <CustomInputRow value={phone} onChange={(e) => setPhone(e.target.value)} label='מספר טלפון' placeholder='' type='tel' dir='ltr' required />
                            <CustomInputRow value={email} onChange={(e) => setEmail(e.target.value)} label='כתובת מייל' placeholder='' type='email' dir='ltr' required />
                            <div className={style.sub_details}>
                                <h2>פרטי חשבון לתשלום</h2>
                                <div className={style.sub_fields_container}>
                                    <CustomInputRow value={paymentName} onChange={(e) => setPaymentName(e.target.value)} label='שם המוטב' placeholder='' type='text' dir='rtl' required />
                                    <CustomInputRow value={paymentAccountNumber} onChange={(e) => setPaymentAccountNumber(e.target.value)} label='מספר חשבון' placeholder='' type='number' numberMin={0} dir='rtl' required />
                                    <CustomInputRow value={paymentBankName} onChange={(e) => setPaymentBankName(e.target.value)} label='שם הבנק' placeholder='' type='text' dir='rtl' required />
                                    <CustomInputRow value={paymentBranch} onChange={(e) => setPaymentBranch(e.target.value)} label='מספר סניף' placeholder='' type='text' dir='rtl' required />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.company_save_btn}>
                    <ButtonSave text='לשמירת הפרטים' type='submit' />
                </div>
            </form>
            {isLoadingAddDetails && <Loader />}
        </PageLayout>
    )
}
