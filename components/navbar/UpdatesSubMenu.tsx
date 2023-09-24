import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { UpdateItem } from './UpdateItem';
import style from "./UpdatesSubMenu.module.css"
import { Update } from '@/Types/objects_types';

const updates: Update[] = [
    {
        id: 1,
        type: "meeting_update",
        updated_item: {
            name: "תקציב 2024",
            date: "2023-10-17T21:00:00.000Z",
        },
        timestamp: "2023-09-24T21:00:00.000Z"
    },
    {
        id: 2,
        type: "fault_update",
        updated_item: {
            name: "נזילה בגג",
        },
        timestamp: "2023-09-23T21:00:00.000Z"
    },
    {
        id: 3,
        type: "fault_update",
        updated_item: {
            name: "צביעת הלובי",
        },
        timestamp: "2023-09-23T15:00:00.000Z"
    },
    {
        id: 4,
        type: "meeting_update",
        updated_item: {
            date: "2023-10-01T21:00:00.000Z",
        },
        timestamp: "2023-09-23T20:00:00.000Z"
    },
]

export function UpdatesSubMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
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
                    maxHeight: "40vw",
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
                {
                    updates.length > 0 && updates.map((update: Update) => (
                        <MenuItem className={style.menu_item} key={update.id}>
                            <UpdateItem updateType={update.type} updateDate={update.timestamp} updatedItemData={update.updated_item} />
                        </MenuItem>
                    ))
                }
            </Menu>
        </div>
    );
}
