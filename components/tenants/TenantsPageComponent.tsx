import React, { useEffect, useState } from 'react'
import { PageLayout } from '../UI/PageLayout'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { ModalAreYouSure } from '../UI/Modals/ModalAreYouSure';
import { useRouter } from 'next/router';
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from '@mui/material/Paper';
import style from "../../styles/TenantsPage.module.css"
import { ModalMessage } from '../UI/Modals/ModalMessage';
import { User } from '@/Types/objects_types';
import { Loader } from '../UI/Loader';


// Create rows data function
function createData(
    id: number,
    apartment_number: number,
    name: string,
    phone: number,
) {
    return { id, apartment_number, name, phone };
}

export function TenantsPageComponent() {
    const router = useRouter();

    // Hardcoded - need to come from store after login
    const buildingID = 1;
    const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
    const usersEndpoint = apiEndpoint + `/v2/buildings/${buildingID}/users`;

    const [users, setUsers] = useState<User[] | null>(null);
    const [isLoading, setLoading] = useState(false);
    const [deletedSupplierId, setDeletedSupplierId] = useState<number | undefined>(undefined);
    const [showModalBeforeDelete, setShowModalBeforeDelete] = useState(false);
    const [showModalAfterDelete, setShowModalAfterDelete] = useState(false);
    const [showErrorDeleteModal, setShowErrorDeleteModal] = useState(false);

    // Handle close Are-you-sure modal
    const handleCloseModalBeforeDelete = () => {
        setShowModalBeforeDelete(false);
    }

    // Handle close message modal
    const handleCloseModalAfterDelete = () => {
        setShowModalAfterDelete(false);
    }

    // Handle close message modal
    const handleCloseDeleteErrorModal = () => {
        setShowErrorDeleteModal(false);
    }

    // Fetch Users
    useEffect(() => {
        setLoading(true);
        fetch(usersEndpoint)
            .then((res) => res.json())
            .then((data) => {
                setUsers(data.users);
                setLoading(false);
            }).catch(err => { console.log(err); setLoading(false); setShowErrorDeleteModal(true); });
    }, []);

    if (isLoading) return <Loader isShadow={false} message='טוען רשימת דיירים...' />;
    if (!users) return <p>לא נמצאו דיירים</p>;


    // Handle click delete supplier button
    const handleClickDelete = (supplierId: number) => {
        setDeletedSupplierId(supplierId);
        setShowModalBeforeDelete(true);
    }

    // Delete Supplier Function
    const handleDeleteSupplier = () => {
        setShowModalBeforeDelete(false);
        setLoading(true);
        setLoading(false);
        setShowModalAfterDelete(true);

    }

    // Create table rows (users) - show only tenants (hide Management company users)
    const rows = users?.map(
        (user => !user.ismanagementcompany ? createData(user.id, user.apartment_number, user.name, user.phone) : null)
    )

    return (
        <div>
            <TableContainer component={Paper} className={style.table_container} >
                <Table aria-label="suppliers table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={style.head_cells} align="center">ת"ז</TableCell>
                            <TableCell className={style.head_cells} align="center">שם דייר</TableCell>
                            <TableCell className={style.head_cells} align="center">מספר דירה</TableCell>
                            <TableCell className={style.head_cells} align="center">מספר נייד</TableCell>
                            <TableCell className={`${style.head_cells} ${style.head_delete}`} align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => !!row && (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                className={style.content_row}
                            >
                                <TableCell className={style.content_cell} align="center">{row.id}</TableCell>
                                <TableCell className={style.content_cell} align="center">{row.name}</TableCell>
                                <TableCell className={style.content_cell} align="center">{row.apartment_number}</TableCell>
                                <TableCell className={style.content_cell} align="center">{'0' + row.phone}</TableCell>
                                <TableCell className={`${style.content_cell} ${style.delete_cell}`} align="center">
                                    <button type='button' onClick={() => handleClickDelete(row.id)}>
                                        <DeleteIcon />
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <ModalAreYouSure message='את/ה בטוח/ה?' mainButtonText='כן' secondButtonText='לא' handleClickMainButton={handleDeleteSupplier} isOpen={showModalBeforeDelete} handleClose={handleCloseModalBeforeDelete} />
            <ModalMessage message='הדייר נמחק בהצלחה' buttonText='אישור' isOpen={showModalAfterDelete} handleClose={handleCloseModalAfterDelete} type='success' />
            <ModalMessage message='קרתה שגיאה במחיקת הדייר' buttonText='אישור' isOpen={showErrorDeleteModal} handleClose={handleCloseDeleteErrorModal} type='error' />
        </div>
    )
}
