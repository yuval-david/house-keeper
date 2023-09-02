import Reac from 'react'
import style from "./HomePageComponent.module.css"
import Link from 'next/link'

export function HomePageComponent() {
    return (
        <div>
            <div className={style.circle_container}>
                <Link href="/" className={style.center}>
                    <h2>במה תרצה להתחיל?</h2>
                </Link>
                <div className={style.links_container}>
                    <Link href="/" className={style.deg0}>
                        <span className={style.yellow}>דוחות</span>
                    </Link>
                    <Link href="/" className={style.deg45}>
                        <span className={style.red}>תקלות</span>
                    </Link>
                    <Link href="/" className={style.deg90}>
                        <span className={style.disabled}>פרטי בניין</span>
                    </Link>
                    <Link href="/" className={style.deg135}>
                        <span className={style.green_zit}>חברת ניהול</span>
                    </Link>
                    <Link href="/" className={style.deg180}>
                        <span className={style.disabled}>תשלומים</span>
                    </Link>
                    <Link href="/" className={style.deg225}>
                        <span className={style.blue}>ניהול דיירים</span>
                    </Link>
                    <Link href="/" className={style.deg270}>
                        <span className={style.disabled}>סקרים</span>
                    </Link>
                    <Link href="/" className={style.deg315}>
                        <span className={style.green}>פגישות דיירים</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}