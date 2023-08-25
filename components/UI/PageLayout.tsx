import Image from 'next/image'
import React, { ReactNode } from 'react'
import style from "./PageLayout.module.css"
import Link from 'next/link';

// This is Layout component for all pages in the application (exclude Home Page)
export function PageLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <nav className={style.nav}>
                <div className={style.nav_items}>
                    <Link className={`blue_title ${style.nav_link}`} href="/">דף הבית</Link>
                    <Link className={`blue_title ${style.nav_link}`} href="/">פגישות דיירים</Link>
                    <Link className={`blue_title ${style.nav_link}`} href="/">תקלות</Link>
                    <Link className={`blue_title ${style.nav_link}`} href="/">חברת ניהול</Link>
                </div>
                <div className={style.logo_container}>
                    <Image src="/housekeeper.jpg" alt="house-kkeper" fill />
                </div>
            </nav>
            <main>
                {children}
            </main>
        </div>
    )
}
