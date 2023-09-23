import Image from 'next/image'
import React, { ReactNode, useState } from 'react'
import style from "./PageLayout.module.css"
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import CancelIcon from '@mui/icons-material/Cancel';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickLogout = () => {
        // Logout function - Need to add here
        router.push("/login");
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

                <div className={style.nav_actions}>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        sx={{
                            minWidth: "unset",
                        }}
                        className={style.btn_user_actions}
                    >
                        <AccountCircleIcon htmlColor='#020079' fontSize='large' />
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                        sx={{
                            "ul": {
                                padding: 0,
                                minHeight: "unset"
                            },
                            "ul li": {
                                minHeight: "unset",
                                xs: {
                                    padding: "3.5vw 4vw",
                                },
                                sm: {
                                    padding: "0.75vw 1.5vw"
                                }
                            }

                        }}
                    >
                        <MenuItem onClick={handleClickLogout} className={style.side_menu_item}>
                            <span className={style.side_menu_label}>התנתקות</span>
                            <span className={style.side_menu_button}><LogoutIcon sx={{ height: "fit-content" }} /></span>
                        </MenuItem>
                    </Menu>
                </div>

                {/** Mobile Hamburger button **/}
                <div className={style.hamburger_btn}>
                    <button type='button' onClick={handleClickHamburger}>
                        <MenuIcon sx={{ fontSize: "350%" }} color='inherit' />
                    </button>
                </div>
            </nav>
            <main className={style.main}>
                {!!pageTitle && <h1 className={`blue_title ${style.page_title}`}>{pageTitle}</h1>}
                {children}
            </main>
        </div>
    )
}
