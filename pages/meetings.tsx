import { PageLayout } from '@/components/UI/PageLayout'
import { MeetingsComponent } from '@/components/meetings/MeetingsComponent'
import React, { useEffect } from 'react'

export default function MeetingsPage() {

    const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;

    // EXAMPLE: simple fetch-data
    async function getData() {
        const URL = apiEndpoint + "/getData";
        const response = await fetch(URL);
        const resJson = await response.json();
        console.log(resJson);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <PageLayout pageTitle="פגישות דיירים">
            <MeetingsComponent />
        </PageLayout>
    )
}
