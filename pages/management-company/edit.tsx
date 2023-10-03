import { PageLayout } from '@/components/UI/PageLayout'
import React, { useEffect, useState } from 'react'
import style from "../../styles/AddCompanyDetails.module.css"
import { CustomInputRow } from '@/components/UI/FormFields/CustomInputRow';
import { ButtonSave } from '@/components/UI/ButtonSave';
import { Loader } from '@/components/UI/Loader';
import { userStore } from '@/stores/UserStore';
import { ModalMessage } from '@/components/UI/Modals/ModalMessage';
import { useRouter } from 'next/router';
import { CompanyInformation, EditCompanyInformationRequest } from '@/Types/objects_types';

export default function AddDetailsPage() {

    const router = useRouter();

    const [name, setName] = useState<string>("");
    const [representativename, setRepresentativeName] = useState<string>("");
    const [phone, setPhone] = useState<number | undefined>(undefined);
    const [email, setEmail] = useState<string>("");
    const [paymentname, setPaymentName] = useState<string>("");
    const [paymentaccountnumber, setPaymentAccountNumber] = useState<number | undefined>(undefined);
    const [paymentbankname, setPaymentBankName] = useState<string>("");
    const [paymentbranch, setPaymentBranch] = useState<string>("");
    const [information, setInformation] = useState<CompanyInformation>();

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

    // Fetch Details
    useEffect(() => {
        setIsLoading(true);
        fetch(managementEndpoint)
            .then((res) => res.json())
            .then((data) => {
                const company: CompanyInformation = data.information[0];
                setInformation(company);
                setName(company.name);
                setRepresentativeName(company.representativename);
                setPhone(company.phone);
                setEmail(company.email);
                setPaymentName(company.paymentname);
                setPaymentAccountNumber(company.paymentaccountnumber);
                setPaymentBankName(company.paymentbankname);
                setPaymentBranch(company.paymentbranch);

                setIsLoading(false);
            }).catch(err => {
                console.log(err);
                setIsLoading(false);
            });
    }, []);


    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setIsLoading(true);
        const data: EditCompanyInformationRequest = {
            building_id,
            name,
            representativename,
            phone,
            email,
            paymentname,
            paymentaccountnumber,
            paymentbankname,
            paymentbranch
        }

        const response = await fetch(managementEndpoint, {
            method: "PUT",
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
                            <CustomInputRow value={representativename} onChange={(e) => setRepresentativeName(e.target.value)} label='שם הנציג' placeholder='' type='text' dir='rtl' required />
                            <CustomInputRow value={phone} onChange={(e) => setPhone(e.target.value)} label='מספר טלפון' placeholder='' type='tel' dir='ltr' required />
                            <CustomInputRow value={email} onChange={(e) => setEmail(e.target.value)} label='כתובת מייל' placeholder='' type='email' dir='ltr' required />
                            <div className={style.sub_details}>
                                <h2>פרטי חשבון לתשלום</h2>
                                <div className={style.sub_fields_container}>
                                    <CustomInputRow value={paymentname} onChange={(e) => setPaymentName(e.target.value)} label='שם המוטב' placeholder='' type='text' dir='rtl' required />
                                    <CustomInputRow value={paymentaccountnumber} onChange={(e) => setPaymentAccountNumber(e.target.value)} label='מספר חשבון' placeholder='' type='number' numberMin={0} dir='rtl' required />
                                    <CustomInputRow value={paymentbankname} onChange={(e) => setPaymentBankName(e.target.value)} label='שם הבנק' placeholder='' type='text' dir='rtl' required />
                                    <CustomInputRow value={paymentbranch} onChange={(e) => setPaymentBranch(e.target.value)} label='מספר סניף' placeholder='' type='text' dir='rtl' required />
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
