export type FaultStatus = "טופלה" | "לא טופלה" | "";
export type FaultUrgency = "דחופה" | "לא דחופה" | "";
export type FaultType = "קלה" | "בינונית" | "חמורה" | "";
export type YesNowAnswers = "כן" | "לא" | "";

export interface Meeting {
    id: number;
    name: string;
    date: string; // Date [2023-06-05]
    time: string; // TIME [00:00:00]
    location: string;
    description?: string;
    summary?: string;
    users?: number[]; // List of users IDs
}

export interface Fault {
    id: number;
    faultName: string;
    faultType: FaultType;
    faultUrgency: FaultUrgency;
    faultLocation: string;
    faultStatus: FaultStatus;
    doneBy?: string;
    isSupplierInvolved?: YesNowAnswers;
    faultPrice?: number;
    faultImage?: string; // check about upload file
}

export interface InputOption {
    label: string;
    value: string | number;
}

export interface Supplier {
    id: number;
    role: string;
    fullName: string;
    phone: number;
}