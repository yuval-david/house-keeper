import { PageLayout } from '@/components/UI/PageLayout'
import React, { useState } from 'react'
import style from "../../../styles/AddSummary.module.css"
import { ButtonSave } from '@/components/UI/ButtonSave';
import { Loader } from '@/components/UI/Loader';
import { CustomInput } from '@/components/UI/FormFields/CustomInput';

export default function addSummaryPage() {

    // Form loading
    const [isLoadingAddSummary, setIsLoadingAddSummary] = useState<boolean>(false);
    const [summary, setSummary] = useState<string>("");

    // Need to add real request
    const handleSubmit = (event: any) => {
        event.preventDefault();
        setIsLoadingAddSummary(true);

        const data = {
            summary
        }
        console.log("Data", data);
        setIsLoadingAddSummary(false);
        alert("תודה!");
        setSummary("");
    }

    return (
        <PageLayout pageTitle='הוספת תקציר לפגישה'>
            <form className={style.form} onSubmit={handleSubmit}>
                <div className={style.meeting_card}>
                    <div className={style.icon_part}>
                        <div className={style.icon_container}>
                            <img src="/icons/meeting-icon.png" alt="meeting" />
                        </div>
                    </div>
                    <div className={style.content_part}>
                        <h2>פגישת ועד בית</h2>
                        <h4>פרטי הפגישה</h4>
                        <div className={style.details_existing}>
                            <div className={style.detail}>
                                <span className={style.label}>תאריך:</span>
                                <span> 10.09.2023</span>
                            </div>
                            <div className={style.detail}>
                                <span className={style.label}>שעה:</span>
                                <span> 16:00</span>
                            </div>
                            <div className={style.detail}>
                                <span className={style.label}>מיקום:</span>
                                <span> דירה 3</span>
                            </div>
                        </div>
                        <div className={style.details_list}>
                            <CustomInput label="תקציר הפגישה" type="textarea" value={summary} onChange={(e) => setSummary(e.target.value)} textareaRows={5} required={true} />
                        </div>
                    </div>
                </div>
                <div className={style.meeting_save_btn}>
                    <ButtonSave text='לחץ לשמירה' type='submit' />
                </div>
            </form>
            {isLoadingAddSummary && <Loader />}
        </PageLayout>
    )
}
