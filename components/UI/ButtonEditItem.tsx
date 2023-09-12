import React from 'react'
import style from "./ButtonEditItem.module.css"
import Link from 'next/link';

export function ButtonEditItem({
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
                <img src="/icons/edit-icon.png" alt="icon add" />
            </div>
        </Link>
    )
}
