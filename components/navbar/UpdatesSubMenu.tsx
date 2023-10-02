import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { UpdateItem } from './UpdateItem';
import style from "./UpdatesSubMenu.module.css"
import { Update } from '@/Types/objects_types';
import { useEffect, useState } from 'react';
import { userStore } from '@/stores/UserStore';
import { Box, CircularProgress } from '@mui/material';


export function UpdatesSubMenu() {

    // Updates MUI component variables
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        fetchUpdates();
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    // Get User Details
    const { is_vahadbait, is_management_company, building_id } = userStore();

    const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
    const updatesEndpoint = apiEndpoint + `/v2/buildings/${building_id}/updates`;
    const [updates, setUpdates] = useState<Update[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);

    // Fetch updates when component mount
    useEffect(() => {
        fetchUpdates();
    }, [building_id]);

    const fetchUpdates = () => {
        setLoading(true);
        fetch(updatesEndpoint)
            .then((res) => res.json())
            .then((data) => {
                setUpdates(data.updates);
                setLoading(false);
            }).catch(error => {
                console.log(error);
                setLoading(false);
            });
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{
                    minWidth: "unset",
                }}
            >
                <NotificationsIcon fontSize='large' htmlColor='#020079' />
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
                    maxHeight: {
                        md: "40vw"
                    },
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
                {isLoading ? <Box className={style.updates_loader}>
                    <CircularProgress color='inherit' size={25} />
                    <p style={{ fontSize: "120%", fontFamily: "sans-serif" }}>טוען עדכונים ...</p>
                </Box> :
                    updates?.length > 0 && updates.map((update: Update) => (
                        <MenuItem className={style.menu_item} key={update.id}>
                            <UpdateItem update={update} />
                        </MenuItem>
                    ))
                }
            </Menu>
        </div>
    );
}
