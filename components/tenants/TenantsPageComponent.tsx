import React, { useState } from 'react'
import { PageLayout } from '../UI/PageLayout'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { ModalAreYouSure } from '../UI/Modals/ModalAreYouSure';
import { useRouter } from 'next/router';
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from '@mui/material/Paper';
import style from "../../styles/TenantsPage.module.css"
import { ModalMessage } from '../UI/Modals/ModalMessage';



// Hardcoded demo-data
const tenants = [
    {
        id: 209281282,
        apartment_number: 1,
        name: "לירון כהן",
        phone: '0503455562'
    },
    {
        id: 205471854,
        apartment_number: 2,
        name: "מאי יששכר",
        phone: '0543455562'
    },
    {
        id: 214787747,
        apartment_number: 3,
        name: "איתי פאר",
        phone: '0540005562'
    },
    {
        id: 269874573,
        apartment_number: 5,
        name: "רון כהן",
        phone: '0540005124'
    },
    {
        id: 269874573,
        apartment_number: 7,
        name: "עמית מזרחי",
        phone: '0540005124'
    },
    {
        id: 269874573,
        apartment_number: 11,
        name: "יובל לוי",
        phone: '0540005124'
    }
];

// Create rows data function
function createData(
    id: number,
    apartment_number: number,
    name: string,
    phone: string, // It will change back to int
) {
    return { id, apartment_number, name, phone };
}

export function TenantsPageComponent() {
    const router = useRouter();

    // Hardcoded - need to come from store after login
    const buildingID = 1;
    const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
    const suppliersEndpoint = apiEndpoint + `/v2/buildings/${buildingID}/managment/contractors`;

    // const [suppliers, setSuppliers] = useState<Supplier[] | null>(null);
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

    // // Fetch Meetings
    // useEffect(() => {
    //     setLoading(true);
    //     fetch(suppliersEndpoint)
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setSuppliers(data.meetings);
    //             setLoading(false);
    //         }).catch(err => { console.log(err); setLoading(false); setShowErrorDeleteModal(true); });
    // }, []);

    // if (isLoading) return <p>Loading...</p>;
    // if (!suppliers) return <p>Missing data about suppliers</p>;


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

    // Create table rows (suppliers)
    const rows = tenants?.map((
        tenant => createData(tenant.id, tenant.apartment_number, tenant.name, tenant.phone)
    ))

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
                        {rows.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                className={style.content_row}
                            >
                                <TableCell className={style.content_cell} align="center">{row.id}</TableCell>
                                <TableCell className={style.content_cell} align="center">{row.name}</TableCell>
                                <TableCell className={style.content_cell} align="center">{row.apartment_number}</TableCell>
                                <TableCell className={style.content_cell} align="center">{row.phone}</TableCell>
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
