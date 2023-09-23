import Head from 'next/head'
import { HomePageComponent } from '@/components/home/HomePageComponent'
import { HomePageLayout } from '@/components/UI/HomePageLayout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';


export default function IndexPage() {

  const router = useRouter();
  // Change to store with local storage
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/login");
    }
  }, []);

  return null;
}
