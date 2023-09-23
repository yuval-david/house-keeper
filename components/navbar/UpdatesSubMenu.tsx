import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { UpdateItem } from './UpdateItem';

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
                <MenuItem>
                    <UpdateItem />
                </MenuItem>
                <MenuItem>
                    <UpdateItem />
                </MenuItem>
                <MenuItem>
                    <UpdateItem />
                </MenuItem>
                <MenuItem>
                    <UpdateItem />
                </MenuItem>
            </Menu>
        </div>
    );
}
