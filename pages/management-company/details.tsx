import { Loader } from '@/components/UI/Loader';
import { PageLayout } from '@/components/UI/PageLayout'
import { AddDetails } from '@/components/management-company/AddDetails';
import { ViewDetails } from '@/components/management-company/ViewDetails';
import { userStore } from '@/stores/UserStore';
import React, { useEffect, useState } from 'react'


export default function DetailsPage() {

    // Get User details
    const { is_vahadbait, building_id } = userStore();
    const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
    const companyEndpoint = apiEndpoint + `/v2/buildings/${building_id}/managment/information`;

    const [isLoading, setLoading] = useState(false);
    const [information, setInformation] = useState();

    // Fetch Details
    useEffect(() => {
        setLoading(true);
        fetch(companyEndpoint)
            .then((res) => res.json())
            .then((data) => {
                setInformation(data.information[0]);
                setLoading(false);
            }).catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    if (isLoading) {
        return <PageLayout pageTitle='פרטי חברת הניהול'>
            <Loader isShadow={false} message="טוען פרטי חברת ניהול..." />
        </PageLayout>
    };


    return (
        <PageLayout pageTitle='פרטי חברת הניהול'>
            {information ? <ViewDetails information={information} /> : <AddDetails />}
        </PageLayout>
    )
}