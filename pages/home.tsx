import React from 'react'
import { HomePageComponent } from '@/components/home/HomePageComponent'
import { HomePageLayout } from '@/components/UI/HomePageLayout'

// Home Page
export default function Home() {
    return (
        <HomePageLayout name="לירון">
            <HomePageComponent />
        </HomePageLayout>
    )
}
