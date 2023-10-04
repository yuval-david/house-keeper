import { UserListener } from '@/stores/UserListener'
import { userStore } from '@/stores/UserStore'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Roboto } from 'next/font/google'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {

  const { is_logged_in } = userStore();
  const router = useRouter();

  // Handle Logged-in global state
  useEffect(() => {
    if (!is_logged_in) {
      router.replace("/login");
    }
  }, [is_logged_in]);

  return <div className={roboto.className}>
    <UserListener />
    <Component {...pageProps} />
  </div>
}
