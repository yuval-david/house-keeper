import React from 'react'
import style from "./ButtonSave.module.css"

export function ButtonSave({
    type = "button",
    text,
    handleClick = () => { },
}: {
    type?: "submit" | "button",
    text: string;
    handleClick?: (event: any) => void;
}) {
    return (
        <button type={type} className={style.button} onClick={handleClick}>
            <div className={style.btn_text}>
                {text}
            </div>
            <div className={style.btn_icon}>
                <img src="/icons/save_icon.png" alt="save" />
            </div>
        </button>
    )
}
