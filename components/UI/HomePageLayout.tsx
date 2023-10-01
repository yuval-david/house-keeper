import Image from 'next/image'
import React, { ReactNode, useState } from 'react'
import style from "./HomePageLayout.module.css"
import { useRouter } from 'next/router';
import { AccountSubMenu } from '../navbar/AccountSubMenu';
import { UpdatesSubMenu } from '../navbar/UpdatesSubMenu';
import { setUserData } from '@/stores/UserStore';

export function HomePageLayout({ name, children }: { name: string; children: ReactNode }) {

    const router = useRouter();

    const handleClickLogout = () => {
        setUserData({
            name: "",
            building_id: 0,
            is_vahadbait: false,
            is_management_company: false,
            is_logged_in: false,
        });
    }

    return (
        <div>
            <nav className={style.nav}>
                <div className={`${style.nav_message} blue_title`}>
                    <div className={style.logo_container}>
                        <Image src="/housekeeper.jpg" alt="house-kkeper" fill />
                    </div>
                    שלום {name}
                </div>
                <div className={style.nav_actions}>
                    <AccountSubMenu handleClickLogout={handleClickLogout} />
                    <UpdatesSubMenu />
                </div>

            </nav >
            <main>
                {children}
            </main>
        </div >
    )
}
