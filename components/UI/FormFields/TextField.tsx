import React from 'react'
import style from "./TextField.module.css"

export function TextField({
    label,
    placeholder,
    dir = "rtl",
    type = "text",
    value,
    onChange,
}: {
    label?: string;
    placeholder?: string;
    dir?: string;
    type?: string;
    value: any,
    onChange: (event: any) => void,
}) {

    let defaultValue: any;
    switch (type) {
        case "number":
            defaultValue = null;
            break;
        case "text":
            defaultValue = undefined;
            break;
        case "password":
            defaultValue = undefined;
        default:
            defaultValue = undefined;
    }

    return (
        <div className={style.text_field_container}>
            <label>{label}</label>
            <input value={value} onChange={onChange} dir={dir} type={type} placeholder={placeholder} className={style.text_field} />
        </div>
    )
}
