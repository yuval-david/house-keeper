import Link from 'next/link'
import React from 'react'
import style from "./ManagementCompanyPage.module.css"

export function ManagementCompanyPageComponent() {
    return (
        <div>
            <div className={style.links_container}>
                <Link href="/faults" className={style.link}>
                    <span className={style.red}>רשימת תקלות</span>
                </Link>
                <Link href="/suppliers" className={style.link}>
                    <span className={style.blue}>רשימת ספקים</span>
                </Link>
                <Link href="/contract" className={style.link}>
                    <span className={style.yellow}>פרטי חוזה</span>
                </Link>
                <Link href="/management-company/details" className={style.link}>
                    <span className={style.orange}>פרטי חברת ניהול</span>
                </Link>
            </div>
        </div>
    )
}
