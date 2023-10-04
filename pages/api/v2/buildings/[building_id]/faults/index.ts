import { sql } from '@vercel/postgres';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { building_id } = req.query;
    const buildingId = building_id as string;

    if (req.method === 'GET') {
        try {
            const faultsResult = await sql`SELECT * FROM faults WHERE building_id = ${buildingId};`;
            res.status(200).json({ faults: faultsResult.rows });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    if (req.method === 'POST') {
        try {
            const { name, severity, urgency, location, status, handledby, vendor, price } = req.body;

            const data = await sql`
            INSERT INTO faults 
            (name, severity, urgency, location, status, handledby, vendor, price, building_id)
            VALUES 
            (${name}, ${severity}, ${urgency}, ${location}, ${status}, ${handledby}, ${vendor}, ${price}, ${buildingId});
            `;

            res.status(201).json({ message: 'Fault created.' });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}