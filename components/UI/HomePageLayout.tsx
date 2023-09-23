import Image from 'next/image'
import React, { ReactNode, useState } from 'react'
import style from "./HomePageLayout.module.css"
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useRouter } from 'next/router';

export function HomePageLayout({ name, children }: { name: string; children: ReactNode }) {

    const router = useRouter();
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
                <div className={`${style.nav_message} blue_title`}>
                    <div className={style.logo_container}>
                        <Image src="/housekeeper.jpg" alt="house-kkeper" fill />
                    </div>
                    בוקר טוב {name}
                </div>
                <div>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        sx={{
                            minWidth: "unset"
                        }}
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

            </nav >
            <main>
                {children}
            </main>
        </div >
    )
}
