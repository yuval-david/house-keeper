import { useRouter } from 'next/router'
import { useEffect } from 'react';
import { userStore } from '@/stores/UserStore';


export default function IndexPage() {

  const router = useRouter();
  const { is_logged_in } = userStore();

  useEffect(() => {
    if (!is_logged_in) {
      router.replace("/login");
    }
  }, [is_logged_in]);

  return null;
}
