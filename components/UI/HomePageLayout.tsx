import Image from 'next/image'
import React, { ReactNode, useState } from 'react'
import style from "./HomePageLayout.module.css"
import { useRouter } from 'next/router';
import { AccountSubMenu } from './AccountSubMenu';

export function HomePageLayout({ name, children }: { name: string; children: ReactNode }) {

    const router = useRouter();

    const handleClickLogout = () => {
        // Logout function - Need to add here
        router.push("/login");
    }

    return (
        <div>
            <nav className={style.nav}>
                <div className={`${style.nav_message} blue_title`}>
                    <div className={style.logo_container}>
                        <Image src="/housekeeper.jpg" alt="house-kkeper" fill />
                    </div>
                    בוקר טוב {name}
                </div>
                <div>
                    <AccountSubMenu handleClickLogout={handleClickLogout} />
                </div>

            </nav >
            <main>
                {children}
            </main>
        </div >
    )
}
