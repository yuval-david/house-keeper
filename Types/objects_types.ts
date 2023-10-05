export type FaultStatus = "טופלה" | "לא טופלה" | "";
export type FaultUrgency = "דחופה" | "לא דחופה" | "";
export type FaultSeveriry = "קלה" | "בינונית" | "חמורה" | "";
export type YesNowAnswers = "כן" | "לא" | "";

export interface Building {
    id: number;
    street: string;
    number: number;
    city: string;
}

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

export interface AddFaultRequest {
    name: string;
    severity: FaultSeveriry;
    urgency: FaultUrgency;
    location: string;
    status: boolean;
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
    fullname: string;
    phone: number;
}

export interface Update {
    id: number;
    type: string;
    item_id: string;
    item_name: string;
    item_date: string;
    timestemp: string; // created date
}

export interface User {
    id: number;
    id_number: number;
    name: string;
    phone: number;
    isvahadbait: boolean;
    ismanagementcompany: boolean;
    email: string;
    apartment_floor: number;
    apartment_number: number;
    apartment_spm: number;
    building_id: number;
}

export interface CompanyInformation {
    building_id: number;
    name: string;
    representativename: string;
    phone: number;
    email: string;
    paymentname: string;
    paymentaccountnumber: number;
    paymentbankname: string;
    paymentbranch: string;
}

export interface EditCompanyInformationRequest {
    building_id: number;
    name?: string;
    representativename?: string;
    phone?: number;
    email?: string;
    paymentname?: string;
    paymentaccountnumber?: number;
    paymentbankname?: string;
    paymentbranch?: string;
}