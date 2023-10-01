import Image from 'next/image'
import React, { ReactNode, useState } from 'react'
import style from "./PageLayout.module.css"
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import CancelIcon from '@mui/icons-material/Cancel';
import { useRouter } from 'next/router';
import { AccountSubMenu } from '../navbar/AccountSubMenu';
import { UpdatesSubMenu } from '../navbar/UpdatesSubMenu';
import { setUserData } from '@/stores/UserStore';

// This is Layout component for all pages in the application (exclude Home Page)
export function PageLayout({ pageTitle, children }: { pageTitle?: string; children: ReactNode }) {


    const router = useRouter();
    const handleClickHamburger = () => {
        setOpenHamburgerNav(true);
    }

    const handleClickClose = () => {
        setOpenHamburgerNav(false);
    }

    const [openHamburgerNav, setOpenHamburgerNav] = useState(false);

    const handleClickLogout = () => {
        setUserData({
            name: "",
            building_id: 0,
            is_vahadbait: false,
            is_management_company: false,
            is_logged_in: false,
        });
        // router.push("/login");
    }

    return (
        <div>
            <nav className={style.nav}>
                <div className={style.nav_main_items}>
                    <div className={style.logo_container}>
                        <Image src="/housekeeper.jpg" alt="house-kkeper" fill />
                    </div>
                    <div className={`${style.nav_items} ${openHamburgerNav ? style.open : {}}`}>
                        <button className={style.close_nav} type='button' onClick={handleClickClose}>
                            <CancelIcon fontSize='large' htmlColor='lightblue' />
                        </button>
                        <Link className={`blue_title ${style.nav_link}`} href="/home">דף הבית</Link>
                        <Link className={`blue_title ${style.nav_link}`} href="/meetings">פגישות דיירים</Link>
                        <Link className={`blue_title ${style.nav_link}`} href="/faults">תקלות</Link>
                        <Link className={`blue_title ${style.nav_link}`} href="/management-company">חברת ניהול</Link>
                        <Link className={`blue_title ${style.nav_link}`} href="/tenants">ניהול דיירים</Link>
                    </div>
                </div>

                <div className={style.mobile_left_part}>
                    <div className={style.nav_actions}>
                        <AccountSubMenu handleClickLogout={handleClickLogout} />
                        <UpdatesSubMenu />
                    </div>

                    {/** Mobile Hamburger button **/}
                    <div className={style.hamburger_btn}>
                        <button type='button' onClick={handleClickHamburger}>
                            <MenuIcon sx={{ fontSize: "350%" }} color='inherit' />
                        </button>
                    </div>
                </div>
            </nav>
            <main className={style.main}>
                {!!pageTitle && <h1 className={`blue_title ${style.page_title}`}>{pageTitle}</h1>}
                {children}
            </main>
        </div>
    )
}
