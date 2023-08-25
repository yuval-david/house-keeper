import Image from 'next/image'
import React, { ReactNode } from 'react'
import style from "./HomePageLayout.module.css"

export function HomePageLayout({ name, children }: { name: string; children: ReactNode }) {
    return (
        <div>
            <nav className={style.nav}>
                <div className={`${style.nav_message} blue_title`}>
                    בוקר טוב {name}
                </div>
                <div className={style.logo_container}>
                    <Image src="/housekeeper.jpg" alt="house-kkeper" fill />
                </div>
            </nav>
            <main>
                {children}
            </main>
        </div>
    )
}
