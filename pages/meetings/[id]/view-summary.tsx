import { PageLayout } from '@/components/UI/PageLayout'
import React from 'react'
import style from "../../../styles/ViewMeeting.module.css"

export default function viewSummaryPage() {
    return (
        <PageLayout pageTitle='תקציר הפגישה'>
            <div className={style.meeting_card}>
                <div className={style.icon_part}>
                    <div className={style.icon_container}>
                        <img src="/icons/meeting-icon.png" alt="meeting" />
                    </div>
                </div>
                <div className={style.content_part}>
                    <h2>פגישת ועד בית</h2>
                    <div className={style.card_flex}>
                        <div className={style.details_right}>
                            <h4>פרטי הפגישה</h4>
                            <div className={style.details_existing}>
                                <div className={style.detail}>
                                    <span className={style.label}>שעה:</span>
                                    <span> 16:00</span>
                                </div>
                                <div className={style.detail}>
                                    <span className={style.label}>מיקום:</span>
                                    <span> דירה 3</span>
                                </div>
                            </div>
                        </div>
                        <div className={style.summary}>
                            <p>בפגישה דנו בצביעת הבניין. החלטנו מה יהיו הגוונים הסופיים: סגול לילך, וכחול ים. למי שיש בעיה שיפנה לועד הבית.</p>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}
