import { PageLayout } from '@/components/UI/PageLayout'
import { FaultsComponent } from '@/components/faults/FaultsComponent'
import React from 'react'

export default function FaultsPage() {
    return (
        <PageLayout pageTitle="תקלות">
            <FaultsComponent />
        </PageLayout>
    )
}
