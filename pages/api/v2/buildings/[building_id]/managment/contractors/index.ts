// POST /api/v2/buildings/{building_id}/managment/contractors
import type { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { building_id } = req.query;
    const buildingId = building_id as string;

    // POST
    if (req.method === 'POST') {
        try {
            const { role, fullName, phone } = req.body;
            const data = await sql`INSERT INTO management_contractors (role, fullName, phone, building_id) VALUES (${role}, ${fullName}, ${phone}, ${buildingId})`;
            res.status(201).json({ message: 'Contractor created.' });

        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    // GET
    else if (req.method === 'GET') {
        try {
            const data = await sql`SELECT * FROM management_contractors WHERE building_id = ${buildingId}`;
            res.status(200).json({ contractors: data.rows });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }

        // other - not allowed   
    } else {
        res.status(405).end();  // Method Not Allowed
    }
}