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