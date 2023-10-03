import { sql } from '@vercel/postgres';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    // GET
    if (req.method === 'GET') {
        try {
            const data = await sql`SELECT * FROM building;`;
            console.log(data);
            res.status(200).json({ buildings: data.rows });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

}