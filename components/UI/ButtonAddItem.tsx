import React from 'react'
import style from "./ButtonAddItem.module.css"
import Link from 'next/link'

export function ButtonAddItem({
    buttonLink,
    buttonText,
}: {
    buttonLink: string;
    buttonText: string;
}) {
    return (
        <Link href={buttonLink} className={style.button}>
            <div className={style.text}>
                {buttonText}
            </div>
            <div className={style.icon_container}>
                <img src="/icons/add-icon.png" alt="icon add" />
            </div>
        </Link>
    )
}
