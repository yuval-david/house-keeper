import Image from 'next/image'
import React, { ReactNode } from 'react'
import style from "./PageLayout.module.css"
import Link from 'next/link';

// This is Layout component for all pages in the application (exclude Home Page)
export function PageLayout({ pageTitle, children }: { pageTitle?: string; children: ReactNode }) {
    return (
        <div>
            <nav className={style.nav}>
                <div className={style.nav_items}>
                    <Link className={`blue_title ${style.nav_link}`} href="/home">דף הבית</Link>
                    <Link className={`blue_title ${style.nav_link}`} href="/meetings">פגישות דיירים</Link>
                    <Link className={`blue_title ${style.nav_link}`} href="/faults">תקלות</Link>
                    <Link className={`blue_title ${style.nav_link}`} href="/management-company">חברת ניהול</Link>
                    <Link className={`blue_title ${style.nav_link}`} href="/tenants">ניהול דיירים</Link>
                </div>
                <div className={style.logo_container}>
                    <Image src="/housekeeper.jpg" alt="house-kkeper" fill />
                </div>
            </nav>
            <main className={style.main}>
                {!!pageTitle && <h1 className={`blue_title ${style.page_title}`}>{pageTitle}</h1>}
                {children}
            </main>
        </div>
    )
}
