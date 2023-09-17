import Head from 'next/head'
import Image from 'next/image'
import style from "../styles/Login.module.css"
import { CustomInput } from "../components/UI/FormFields/CustomInput"
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Login() {

    const router = useRouter();

    // Form Fields
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Handle submit login function
    const handleLogin = async (event: any) => {
        event.preventDefault();
        const data = {
            email,
            password,
        }

        console.log(data);
        router.replace("/home");

        // Add after finish backned: 
        // const url = "https://localhost:3000/api/login";
        // const response = await fetch(url, {
        //     method: "POST",
        //     mode: "cors",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(data)
        // });
        // console.log("response: ", response);
    }

    return (
        <>
            <Head>
                <title>HouseKeeper | התחברות</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={style.login_main} dir='rtl'>
                <div className={style.login_logo}>
                    <Image src="/housekeeper.jpg" fill alt="House Keeper" />
                </div>
                <div className={style.login_form}>
                    <h1 className={`blue_title ${style.form_title}`}>התחברות</h1>
                    <form dir='rtl' onSubmit={(e) => handleLogin(e)}>
                        <div className={style.field_container}>
                            <CustomInput value={email} onChange={(e) => setEmail(e.target.value)} label="כתובת אימייל" dir='ltr' type='text' />
                            <CustomInput value={password} onChange={(e) => setPassword(e.target.value)} label="סיסמה" dir='ltr' type='password' />
                        </div>
                        <button className={style.submit_btn} type='submit'>התחברות</button>
                        <Link href="#" className={style.register_text}>
                            עדיין לא רשום? לחץ כאן להרשמה
                        </Link>
                    </form>
                </div>
            </main>
        </>
    )
}
