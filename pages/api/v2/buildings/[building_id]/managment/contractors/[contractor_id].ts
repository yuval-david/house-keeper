// POST /api/v2/buildings/{building_id}/managment/contractors/[contractor_id]
import type { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { building_id, contractor_id } = req.query;
    const buildingId = building_id as string;
    const contractorId = contractor_id as string;


    // GET
    if (req.method === 'GET') {
        try {
            const data = await sql`SELECT * FROM management_contractors WHERE building_id = ${buildingId} AND id = ${contractorId};`;
            res.status(200).json({ contractor: data.rows[0] });

        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }


    // DELETE
    if (req.method === 'DELETE') {
        try {
            const data = await sql`DELETE FROM management_contractors WHERE building_id = ${buildingId} AND id = ${contractorId}`;
            res.status(201).json({ message: 'Contractor deleted.' });

        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}