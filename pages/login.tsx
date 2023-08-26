import Head from 'next/head'
import Image from 'next/image'
import style from "../styles/Login.module.css"


export default function Login() {

    return (
        <>
            <Head>
                <title>HouseKeeper | התחברות</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <div className={style.login_logo}>
                    <Image src="/housekeeper.jpg" fill alt="House Keeper" />
                </div>
            </main>
        </>
    )
}
