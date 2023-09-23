import { PageLayout } from '@/components/UI/PageLayout'
import { AddDetails } from '@/components/management-company/AddDetails';
import { ViewDetails } from '@/components/management-company/ViewDetails';
import React from 'react'


export default function DetailsPage() {

    // Now hardcoded - Need to come from DB
    const existingDetails = false;

    return (
        <PageLayout pageTitle='פרטי חברת הניהול'>
            {existingDetails ? <ViewDetails /> : <AddDetails />}
        </PageLayout>
    )
}
