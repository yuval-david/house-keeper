import React from 'react'
import style from "./HomePageComponent.module.css"
import Link from 'next/link'
import { userStore } from '@/stores/UserStore';

export function HomePageComponent() {

    // Get User Details
    const { is_vahadbait, is_management_company } = userStore();

    return (
        <div>
            <div className={style.home_menu_container}>
                <h2>במה תרצו להתחיל?</h2>

                <div className={style.links_container}>
                    <Link href="/" className={style.deg0}>
                        <span className={style.disabled}>דוחות</span>
                    </Link>
                    <Link href="/faults" className={style.deg45}>
                        <span className={style.red}>תקלות</span>
                    </Link>
                    <Link href="/" className={style.deg90}>
                        <span className={style.disabled}>פרטי בניין</span>
                    </Link>
                    <Link href="/management-company" className={style.deg135}>
                        <span className={style.green_zit}>חברת ניהול</span>
                    </Link>
                    <Link href="/" className={style.deg180}>
                        <span className={style.disabled}>תשלומים</span>
                    </Link>
                    <Link href="/tenants" className={style.deg225}>
                        <span className={style.blue}>ניהול דיירים</span>
                    </Link>
                    {!is_management_company && <Link href="/" className={style.deg270}>
                        <span className={style.disabled}>סקרים</span>
                    </Link>}
                    {!is_management_company && <Link href="/meetings" className={style.deg315}>
                        <span className={style.green}>פגישות דיירים</span>
                    </Link>}
                </div>
            </div>
        </div>
    )
}
