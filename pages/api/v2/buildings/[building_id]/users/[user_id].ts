import { sql } from '@vercel/postgres';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { building_id, user_id } = req.query;
    const buildingId = building_id as string;
    const userId = user_id as string;

    // GET
    if (req.method === 'GET') {
        try {
            const data = await sql`SELECT * FROM users WHERE building_id = ${buildingId} AND id = ${userId};`;
            console.log(data);
            res.status(200).json({ user: data.rows[0] });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    // DELETE
    if (req.method === 'DELETE') {
        try {
            const data = await sql`DELETE FROM users WHERE building_id = ${buildingId} AND id = ${userId};`;
            res.status(201).json({ message: 'User deleted.' });

        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}