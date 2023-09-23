import React from 'react'
import style from "./CustomInput.module.css"
import { InputOption } from '@/Types/objects_types';

export function CustomInput({
    label,
    placeholder,
    dir = "rtl",
    type = "text",
    value,
    required = false,
    textareaRows = 3,
    options = [],
    onChange,
}: {
    label?: string;
    placeholder?: string;
    dir?: string;
    type?: string;
    value: any,
    required?: boolean,
    textareaRows?: number;
    // Options can be strings array or objects array
    options?: InputOption[] | string[];
    onChange: (event: any) => void,
}) {

    let defaultValue: any;
    switch (type) {
        case "number":
            defaultValue = null;
            break;
        case "text":
            defaultValue = undefined;
        case "textarea":
            defaultValue = undefined;
            break;
        case "password":
            defaultValue = undefined;
        case "select":
            defaultValue = undefined;
        default:
            defaultValue = undefined;
    }

    const displayedLabel = required ? "*" + label : label;

    if (type === "textarea") {
        return (
            <div className={style.text_field_container}>
                <label>{displayedLabel}: </label>
                <textarea required={required} rows={textareaRows} value={value} onChange={onChange} dir={dir} placeholder={placeholder} className={style.text_field} />
            </div>

        )
    }

    if (type === "select") {
        return (
            <div className={style.text_field_container}>
                <label htmlFor={label}>{displayedLabel}: </label>
                <select name={label} id={label} value={value} onChange={onChange} dir={dir} className={style.text_field} required={required}>
                    <option value="" disabled>בחר/י</option>
                    {options.map((optionItem, index) => {

                        if (typeof optionItem === "string") {
                            return (
                                <option value={optionItem} key={index}>{optionItem}</option>
                            )
                        }

                        if (typeof optionItem === "object") {
                            return (
                                <option value={optionItem.value} key={index}>{optionItem.label}</option>
                            )
                        }

                    })}
                </select>
            </div>

        )
    }


    return (
        <div className={style.text_field_container}>
            <label>{displayedLabel}</label>
            <input required={required} value={value} onChange={onChange} dir={dir} type={type} placeholder={placeholder} className={style.text_field} />
        </div>
    )
}
