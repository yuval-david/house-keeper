import { PageLayout } from '@/components/UI/PageLayout'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import style from "../../styles/Suppliers.module.css"
import { useEffect, useState } from 'react';
import { Supplier } from '@/Types/objects_types';
import { ButtonAddItem } from '@/components/UI/ButtonAddItem';
import DeleteIcon from '@mui/icons-material/Delete';
import { ModalMessage } from '@/components/UI/Modals/ModalMessage';
import { ModalAreYouSure } from '@/components/UI/Modals/ModalAreYouSure';
import { useRouter } from 'next/router';


// Hardcoded demo-data
const suppliers = [
    {
        id: 1,
        role: "גנן",
        fullName: "שלומי זהבי",
        phone: '0503455562'
    },
    {
        id: 2,
        role: "טכנאי",
        fullName: "משה גבאי",
        phone: '0543455562'
    },
    {
        id: 3,
        role: "מנקה",
        fullName: "אבי זוהר",
        phone: '0540005562'
    },
    {
        id: 4,
        role: "אינסטלטור",
        fullName: "רון לוי",
        phone: '0540005124'
    }
];

// Create rows data function
function createData(
    id: number,
    role: string,
    fullName: string,
    phone: string, // It will change back to int
) {
    return { id, role, fullName, phone };
}


export default function SuppliersPage() {

    const router = useRouter();

    // Hardcoded - need to come from store after login
    const buildingID = 1;
    const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
    const suppliersEndpoint = apiEndpoint + `/v1/buildings/${buildingID}/managment/contractors`;

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
    const rows = suppliers?.map((
        supplier => createData(supplier.id, supplier.role, supplier.fullName, supplier.phone)
    ))

    return (
        <PageLayout pageTitle='רשימת ספקים'>
            <ButtonAddItem buttonText='הוספת ספק' buttonLink='/suppliers/add' />
            <TableContainer component={Paper} className={style.table_container}>
                <Table aria-label="suppliers table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={style.head_cells} align="center">תפקיד</TableCell>
                            <TableCell className={style.head_cells} align="center">שם מלא</TableCell>
                            <TableCell className={style.head_cells} align="center">טלפון</TableCell>
                            <TableCell className={`${style.head_cells} ${style.head_delete}`} align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.fullName}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                className={style.content_row}
                            >
                                <TableCell className={style.content_cell} align="center">{row.role}</TableCell>
                                <TableCell className={style.content_cell} align="center">{row.fullName}</TableCell>
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
            <ModalMessage message='הספק נמחק בהצלחה' buttonText='אישור' isOpen={showModalAfterDelete} handleClose={handleCloseModalAfterDelete} type='success' />
            <ModalMessage message='קרתה שגיאה במחיקת הספק' buttonText='אישור' isOpen={showErrorDeleteModal} handleClose={handleCloseDeleteErrorModal} type='error' />
        </PageLayout>
    )
}
