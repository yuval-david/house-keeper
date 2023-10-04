import React from 'react'
import { HomePageComponent } from '@/components/home/HomePageComponent'
import { HomePageLayout } from '@/components/UI/HomePageLayout'
import { userStore } from '@/stores/UserStore';

// Home Page
export default function Home() {

    // Get User Details
    const { name } = userStore();

    return (
        <HomePageLayout name={name}>
            <HomePageComponent />
        </HomePageLayout>
    )
}
