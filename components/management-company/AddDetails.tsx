import React from 'react'
import { ButtonAddItem } from '../UI/ButtonAddItem'
import style from "./AddDetails.module.css"
import { userStore } from '@/stores/UserStore'

export function AddDetails() {

    const { is_vahadbait } = userStore();

    return (
        <div>
            <p className={style.info_content}>
                במערכת לא קיימים פרטים אודות חברת הניהול.
                <br />
                {is_vahadbait && <>תוכלו להעלות את הפרטים מכאן.</>}
            </p>
            {is_vahadbait && <ButtonAddItem buttonText='הוספת פרטי חברת ניהול' buttonLink='/management-company/add' />}
        </div>
    )
}
