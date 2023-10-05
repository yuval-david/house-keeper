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
import { Loader } from '@/components/UI/Loader';
import { userStore } from '@/stores/UserStore';


// Create rows data function
function createData(
    id: number,
    role: string,
    fullname: string,
    phone: number, // It will change back to int
) {
    return { id, role, fullname, phone };
}


export default function SuppliersPage() {

    const router = useRouter();

    // Get User Details
    const { building_id, is_vahadbait, is_management_company } = userStore();

    const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
    const suppliersEndpoint = apiEndpoint + `/v2/buildings/${building_id}/managment/contractors`;

    const [suppliers, setSuppliers] = useState<Supplier[] | null>(null);
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

    // Fetch Contractors
    useEffect(() => {
        setLoading(true);
        fetch(suppliersEndpoint)
            .then((res) => res.json())
            .then((data) => {
                setSuppliers(data.contractors);
                setLoading(false);
            }).catch(err => { console.log(err); setLoading(false); setShowErrorDeleteModal(true); });
    }, [showModalAfterDelete]);

    if (isLoading) return (
        <PageLayout pageTitle='רשימת ספקים'>
            <Loader isShadow={false} message='טוען רשימת ספקים...' />
        </PageLayout>
    );

    if (!suppliers) return (
        <PageLayout pageTitle='רשימת ספקים'>
            <p>לא נמצאו ספקים</p>
        </PageLayout>
    );


    // Handle click delete supplier icon
    const handleClickDelete = (supplierId: number) => {
        setDeletedSupplierId(supplierId);
        setShowModalBeforeDelete(true);
    }

    // Delete Supplier Function (click - yes)
    const handleDeleteSupplier = async () => {
        setShowModalBeforeDelete(false);
        setLoading(true);
        if (!deletedSupplierId) return;

        try {

            const response: any = await fetch(`${suppliersEndpoint}/${deletedSupplierId}`, {
                method: "DELETE",
            });
            const resJson = await response.json();
            setLoading(false);
            if (response.ok) {
                setShowModalAfterDelete(true);
            }
        } catch (error: any) {
            setLoading(false);
            setShowErrorDeleteModal(true);
            console.log(error);
        }

    }

    // Create table rows (suppliers)
    const rows = suppliers?.map((
        supplier => createData(supplier.id, supplier.role, supplier.fullname, supplier.phone)
    ))

    return (
        <PageLayout pageTitle='רשימת ספקים'>
            {(is_vahadbait || is_management_company) && <ButtonAddItem buttonText='הוספת ספק' buttonLink='/suppliers/add' />}
            {suppliers.length < 1 && <p>לא קיימים ספקים לבניין.</p>}
            {suppliers.length > 0 && <TableContainer component={Paper} className={style.table_container}>
                <Table aria-label="suppliers table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={style.head_cells} align="center">תפקיד</TableCell>
                            <TableCell className={style.head_cells} align="center">שם מלא</TableCell>
                            <TableCell className={style.head_cells} align="center">טלפון</TableCell>
                            {(is_vahadbait || is_management_company) && <TableCell className={`${style.head_cells} ${style.head_delete}`} align="center"></TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.fullname}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                className={style.content_row}
                            >
                                <TableCell className={style.content_cell} align="center">{row.role}</TableCell>
                                <TableCell className={style.content_cell} align="center">{row.fullname}</TableCell>
                                <TableCell className={style.content_cell} align="center">{"0" + row.phone}</TableCell>
                                {(is_vahadbait || is_management_company) && <TableCell className={`${style.content_cell} ${style.delete_cell}`} align="center">
                                    <button type='button' onClick={() => handleClickDelete(row.id)}>
                                        <DeleteIcon />
                                    </button>
                                </TableCell>}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>}
            <ModalAreYouSure Message='את/ה בטוח/ה?' mainButtonText='כן' secondButtonText='לא' handleClickMainButton={handleDeleteSupplier} isOpen={showModalBeforeDelete} handleClose={handleCloseModalBeforeDelete} />
            <ModalMessage message='הספק נמחק בהצלחה' buttonText='אישור' isOpen={showModalAfterDelete} handleClose={handleCloseModalAfterDelete} type='success' />
            <ModalMessage message='קרתה שגיאה במחיקת הספק' buttonText='אישור' isOpen={showErrorDeleteModal} handleClose={handleCloseDeleteErrorModal} type='error' />
        </PageLayout>
    )
}
