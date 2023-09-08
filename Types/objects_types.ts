export interface Meeting {
    id: string;
    name: string;
    date: string; // Date
    location?: string;
    description?: string;
    summary?: string;
    users?: number[]; // List of users IDs
}