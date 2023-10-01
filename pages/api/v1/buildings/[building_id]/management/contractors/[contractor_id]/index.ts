// POST /api/v1/buildings/{building_id}/managment/contractors
import executeQuery from '@/DB/connectDB';
import type {NextApiRequest, NextApiResponse} from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { building_id, contractor_id } = req.query;

    if (req.method === 'DELETE') {
        try {
            await executeQuery({
                query: 'DELETE FROM management_contractors WHERE id = $1 AND building_id = $2',
                values: [contractor_id, building_id],
            });
            res.status(200).json({message: 'contractor deleted.'});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).end();  // Method Not Allowed
    }
}
