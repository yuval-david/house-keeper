import { useEffect } from "react";
import { userStore } from "./UserStore";
import { useRouter } from "next/router";

export const UserListener = () => {

    const router = useRouter();
    const { is_logged_in } = userStore();


    useEffect(() => {
        if (!is_logged_in) {
            return () => { };
        }

        // After 30 minutes -> user authorization expired
        const x = setTimeout(() => {
            userStore.setState({ is_logged_in: false });
        }, 1000 * 60 * 30);

        return () => clearTimeout(x);
    }, [is_logged_in]);

    return null;
}