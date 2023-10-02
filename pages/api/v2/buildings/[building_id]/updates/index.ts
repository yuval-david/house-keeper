import { sql } from '@vercel/postgres';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { building_id } = req.query;
    const buildingId = building_id as string;

    // GET
    if (req.method === 'GET') {
        try {
            const data = await sql`SELECT * FROM updates WHERE building_id = ${buildingId};`;
            console.log(data);
            res.status(200).json({ updates: data.rows });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    // POST
    if (req.method === 'POST') {
        try {
            const {
                type,
                item_id,
                item_name,
                item_date
            } = req.body;

            const data = await sql`
            INSERT INTO updates 
            (type, item_id, item_name, item_date) 
            VALUES 
            (${type}, ${item_id}, ${item_name}, ${item_date})
            ;`;
            console.log(data);

            res.status(201).json({ message: 'Update created.' });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}