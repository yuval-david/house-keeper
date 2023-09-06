import React from 'react'
import style from "./CustomInputRow.module.css"

export function CustomInputRow({
    label,
    placeholder,
    dir = "rtl",
    type = "text",
    value,
    required = false,
    onChange,
}: {
    label?: string;
    placeholder?: string;
    dir?: string;
    type?: string;
    value: any,
    required?: boolean,
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
            <input required value={value} onChange={onChange} dir={dir} type={type} placeholder={placeholder} className={style.text_field} />
        </div>
    )
}
