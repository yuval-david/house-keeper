import React from 'react'
import style from "./TextField.module.css"

export function TextField({
    label,
    placeholder,
    dir = "rtl",
    type = "text",
}: {
    label?: string;
    placeholder?: string;
    dir?: string;
    type?: string;
}) {
    return (
        <div className={style.text_field_container}>
            <label>{label}</label>
            <input dir={dir} type={type} placeholder={placeholder} className={style.text_field} />
        </div>
    )
}
