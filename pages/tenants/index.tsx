import { PageLayout } from '@/components/UI/PageLayout'
import { TenantsPageComponent } from '@/components/tenants/TenantsPageComponent'
import React from 'react'

export default function TenantsPage() {
    return (
        <PageLayout pageTitle="ניהול דיירים">
            <TenantsPageComponent />
        </PageLayout>
    )
}
