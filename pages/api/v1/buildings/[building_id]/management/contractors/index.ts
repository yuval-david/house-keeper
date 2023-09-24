// POST /api/v1/buildings/{building_id}/managment/contractors
import executeQuery from '@/DB/connectDB';
import type {NextApiRequest, NextApiResponse} from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { building_id } = req.query;

    if (req.method === 'POST') {
        try {
            const { role, fullName, phone } = req.body;

            const data = await executeQuery({
                query: `INSERT INTO management_contractors (role, fullName, phone, building_id) VALUES ($1, $2, $3, $4) RETURNING *`,
                values: [role, fullName, phone, building_id],
            });

            res.status(201).json(data[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else if (req.method === 'GET') {
        try {
            const data = await executeQuery({
                query: `SELECT * FROM management_contractors WHERE building_id = $1`,
                values: [building_id],
            });

            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).end();  // Method Not Allowed
    }
}
