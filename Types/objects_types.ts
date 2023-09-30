export type FaultStatus = "טופלה" | "לא טופלה" | "";
export type FaultUrgency = "דחופה" | "לא דחופה" | "";
export type FaultSeveriry = "קלה" | "בינונית" | "חמורה" | "";
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
    name: string;
    severity: FaultSeveriry;
    urgency: FaultUrgency;
    location: string;
    status: boolean;
    handledby?: string;
    vendor?: boolean;
    price?: number;
}

export interface editFaultRequest {
    id: number;
    name?: string;
    severity?: FaultSeveriry;
    urgency?: FaultUrgency;
    location?: string;
    status?: boolean;
    handledby?: string;
    vendor?: boolean;
    price?: number;
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

export interface Update {
    id: number;
    type: string;
    updated_item: {
        name?: string;
        date?: string; // timestamp
    };
    timestamp: string; // created date
}