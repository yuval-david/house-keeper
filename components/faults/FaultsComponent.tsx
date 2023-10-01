import React, { useEffect, useState } from 'react'
import { ButtonAddItem } from '../UI/ButtonAddItem'
import style from "./FaultsComponent.module.css"
import { FaultCard } from './FaultCard'
import { Fault } from '@/Types/objects_types'
import { Loader } from '../UI/Loader'
import { userStore } from '@/stores/UserStore'

export function FaultsComponent() {

    // Get User details
    const { is_vahadbait, building_id } = userStore();
    const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
    const faultsEndpoint = apiEndpoint + `/v2/buildings/${building_id}/faults`;

    const [faults, setFaults] = useState<Fault[] | null>(null);
    const [isLoading, setLoading] = useState(false);

    // Fetch Faults
    useEffect(() => {
        setLoading(true);
        fetch(faultsEndpoint)
            .then((res) => res.json())
            .then((data) => {
                setFaults(data.faults);
                setLoading(false);
            }).catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    if (isLoading) return <Loader isShadow={false} message="טוען רשימת תקלות..." />;
    if (!faults) return <p>לא נמצאו תקלות.</p>;


    return (
        <div>
            <ButtonAddItem buttonLink="/faults/add" buttonText='להוספת תקלה חדשה' />
            <div className={style.faults_cards_container}>
                {
                    faults.length > 0 && faults.map((faultItem) => (
                        <FaultCard key={faultItem.id} id={faultItem.id} faultData={faultItem} />
                    ))
                }
            </div>
        </div>
    )
}
