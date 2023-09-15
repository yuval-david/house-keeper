import React from 'react'
import style from "./CustomInputRow.module.css"
import { InputOption } from '@/Types/objects_types';

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
    // Options can be strings array or objects array
    options?: InputOption[] | string[];
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

    if (type === "radio") {
        return (
            <div className={style.text_field_container}>
                <label>{displayedLabel}: </label>
                <div className={style.radio_container}>
                    <div className={style.options_list}>
                        {options.map((radioOption, index) => {

                            if (typeof radioOption === "string") {
                                return (
                                    <div className={style.radio_div} key={index}>
                                        <input type="radio" id={radioOption} name={label} value={radioOption} onChange={onChange} required={required} checked={value === radioOption} />
                                        <label htmlFor={radioOption}>{radioOption}</label>
                                    </div>
                                )
                            }

                            if (typeof radioOption === "object") {
                                return (
                                    <div className={style.radio_div} key={index}>
                                        <input type="radio" id={radioOption.label} name={label} value={radioOption.value} onChange={onChange} required={required} checked={value == radioOption.value} />
                                        <label htmlFor={radioOption.label}>{radioOption.label}</label>
                                    </div>
                                )
                            }

                        })}

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
