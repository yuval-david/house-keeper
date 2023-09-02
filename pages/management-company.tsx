import { PageLayout } from '@/components/UI/PageLayout'
import { ManagementCompanyPageComponent } from '@/components/management-company/ManagementCompanyPageComponent'
import React from 'react'

export default function ManagementCompanyPage() {
    return (
        <PageLayout pageTitle="חברת הניהול">
            <ManagementCompanyPageComponent />
        </PageLayout>
    )
}
