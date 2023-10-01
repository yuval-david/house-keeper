import executeQuery from '@/DB/connectDB';
import type {NextApiRequest, NextApiResponse} from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {building_id, fault_id} = req.query;

    if (req.method === 'GET') {
        try {
            const data = await executeQuery({
                query: 'SELECT * FROM faults WHERE building_id = $1',
                values: [building_id],
            });
            res.status(200).json({faults: data});
        } catch (error: any) {
            res.status(500).json({error: error.message});
        }
    } else if (req.method === 'POST') {
        try {
            const {details, severity, location, status, handledBy, vendor, price} = req.body;
            const data = await executeQuery({
                query: `INSERT INTO faults (details, severity, location, status, handledBy, vendor, price, building_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
                values: [details, severity, location, status, handledBy, vendor, price, building_id],
            });

            res.status(201).json({faults: data[0]});
        } catch (error: any) {
            res.status(500).json({error: error.message});
        }
    } else if (req.method === 'PATCH') {
        // (Similar to the meeting PATCH example, with faults-related fields)
    } else {
        res.status(405).end();  // Method Not Allowed
    }
}
