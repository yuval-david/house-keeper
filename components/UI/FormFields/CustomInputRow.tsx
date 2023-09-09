import React from 'react'
import style from "./CustomInputRow.module.css"

export function CustomInputRow({
    label,
    placeholder,
    dir = "rtl",
    type = "text",
    value,
    required = false,
    textareaRows = 3,
    onChange,
}: {
    label?: string;
    placeholder?: string;
    dir?: string;
    type?: string;
    value: any,
    required?: boolean,
    textareaRows?: number;
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
        case "textarea":
            defaultValue = undefined;
            break;
        case "password":
            defaultValue = undefined;
        default:
            defaultValue = undefined;
    }

    const displayedLabel = required ? "*" + label : label;

    if (type === "textarea") {
        return (
            <div className={style.text_field_container}>
                <label>{displayedLabel}: </label>
                <textarea rows={textareaRows} value={value} onChange={onChange} dir={dir} placeholder={placeholder} className={style.text_field} />
            </div>

        )
    }

    return (
        <div className={style.text_field_container}>
            <label>{displayedLabel}:</label>
            <input required={required} value={value} onChange={onChange} dir={dir} type={type} placeholder={placeholder} className={style.text_field} />
        </div>
    )
}
