import { PageLayout } from '@/components/UI/PageLayout'
import React, { useState } from 'react'
import style from "../../styles/AddCompanyDetails.module.css"
import { CustomInputRow } from '@/components/UI/FormFields/CustomInputRow';
import { ButtonSave } from '@/components/UI/ButtonSave';
import { Loader } from '@/components/UI/Loader';
import { userStore } from '@/stores/UserStore';
import { ModalMessage } from '@/components/UI/Modals/ModalMessage';
import { useRouter } from 'next/router';

export default function AddDetailsPage() {

    const router = useRouter();

    const [name, setName] = useState<string>("");
    const [representativeName, setRepresentativeName] = useState<string>("");
    const [phone, setPhone] = useState<number | undefined>(undefined);
    const [email, setEmail] = useState<string>("");
    const [paymentName, setPaymentName] = useState<string>("");
    const [paymentAccountNumber, setPaymentAccountNumber] = useState<number | undefined>(undefined);
    const [paymentBankName, setPaymentBankName] = useState<string>("");
    const [paymentBranch, setPaymentBranch] = useState<string>("");

    // Form loading
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [successModal, setSuccessModal] = useState(false);
    const [errorModal, setErrorModal] = useState(false);

    const handleCloseSuccessModal = () => {
        setSuccessModal(false);
        router.push("/management-company/details");
    }
    const handleCloseErrorModal = () => {
        setErrorModal(false);
    }

    // Get User Details
    const { is_vahadbait, is_management_company, building_id } = userStore();

    const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
    const managementEndpoint = apiEndpoint + `/v2/buildings/${building_id}/managment/information`;


    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setIsLoading(true);
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

        const response = await fetch(managementEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        setIsLoading(false);

        if (response.ok) {
            setSuccessModal(true);
        } else {
            console.log(response.json());
            setErrorModal(true);
        }
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
            {isLoading && <Loader />}
            <ModalMessage isOpen={successModal} handleClose={handleCloseSuccessModal} message="פרטי חברת הניהול נוצרו בהצלחה" buttonText='אישור' type='success' />
            <ModalMessage isOpen={errorModal} handleClose={handleCloseErrorModal} message="ישנה שגיאה בהוספת הפרטים, אנא נסו שוב." buttonText='אישור' type='error' />
        </PageLayout>
    )
}
