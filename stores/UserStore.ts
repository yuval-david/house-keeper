import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware'

interface UserState {
    name: string;
    building_id: number;
    is_vahadbait: boolean;
    is_management_company: boolean;
    user_id: number;
    is_logged_in: boolean;
}


export const userStore = create<UserState>()(
    devtools(
        persist(
            (set) => ({
                name: "",
                building_id: 0,
                is_vahadbait: false,
                is_management_company: false,
                user_id: 0,
                is_logged_in: false
            }),
            {
                name: 'user',
            }
        )
    )
);

export const setUserData = userStore.setState;