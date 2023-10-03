import { sql } from '@vercel/postgres';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { building_id } = req.query;
    const buildingId = building_id as string;
    // GET
    if (req.method === 'GET') {
        try {
            const data = await sql`SELECT * FROM building WHERE id=${buildingId};`;
            console.log(data);
            res.status(200).json({ building: data.rows[0] });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

}