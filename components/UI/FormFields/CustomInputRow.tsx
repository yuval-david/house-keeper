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
    options = [],
    numberMin = 0,
    fileTypesAccept,
    onChange,
}: {
    label?: string;
    placeholder?: string;
    dir?: string;
    type?: string;
    value: any,
    required?: boolean,
    textareaRows?: number;
    options?: string[];
    numberMin?: number;
    fileTypesAccept?: string;
    onChange: (event: any) => void,
}) {

    let defaultValue: any;
    switch (type) {
        case "number":
            defaultValue = null;
            break;
        case "text":
            defaultValue = undefined;
        case "number":
            defaultValue = null;
            break;
        case "textarea":
            defaultValue = undefined;
            break;
        case "password":
            defaultValue = undefined;
        case "select":
            defaultValue = undefined;
        case "radio":
            defaultValue = undefined;
        default:
            defaultValue = undefined;
    }

    const displayedLabel = required ? "*" + label : label;

    if (type === "textarea") {
        return (
            <div className={style.text_field_container}>
                <label>{displayedLabel}: </label>
                <textarea rows={textareaRows} value={value} onChange={onChange} dir={dir} placeholder={placeholder} className={style.text_field} required={required} />
            </div>

        )
    }

    if (type === "select") {
        return (
            <div className={style.text_field_container}>
                <label htmlFor={label}>{displayedLabel}: </label>
                <select name={label} id={label} value={value} onChange={onChange} dir={dir} className={style.text_field} required={required}>
                    <option value="" disabled>בחר/י</option>
                    {options.map((optionItem) => (
                        <option value={optionItem}>{optionItem}</option>
                    ))}
                </select>
            </div>

        )
    }

    if (type === "radio") {
        return (
            <div className={style.text_field_container}>
                <label>{displayedLabel}: </label>
                <div className={style.radio_container}>
                    <div className={style.options_list}>
                        {options.map((radioOption) => (
                            <div className={style.radio_div}>
                                <input type="radio" id={radioOption} name={label} value={radioOption} onChange={onChange} required={required} />
                                <label htmlFor={radioOption}>{radioOption}</label>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

        )
    }

    if (type === "file") {
        return (
            <div className={`${style.text_field_container} ${style.file_container}`}>
                <label>{displayedLabel}:</label>
                <div className={style.inp_file}>
                    <input required={required} value={value} onChange={onChange} dir={dir} type={type} placeholder={placeholder} className={style.text_field} accept={fileTypesAccept} />
                </div>
            </div>

        )
    }

    return (
        <div className={style.text_field_container}>
            <label>{displayedLabel}:</label>
            <input required={required} value={value} onChange={onChange} dir={dir} type={type} placeholder={placeholder} className={style.text_field} min={numberMin} />
        </div>
    )
}
