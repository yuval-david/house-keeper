import React from 'react'
import { ButtonAddItem } from '../UI/ButtonAddItem'
import style from "./AddDetails.module.css"

export function AddDetails() {

    return (
        <div>
            <p className={style.info_content}>
                במערכת לא קיימים פרטים אודות חברת הניהול.
                <br />
                תוכלו להעלות את הפרטים מכאן.
            </p>
            <ButtonAddItem buttonText='הוספת פרטי חברת ניהול' buttonLink='/management-company/add' />
        </div>
    )
}
