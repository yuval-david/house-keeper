import executeQuery from '@/DB/connectDB';
import type {NextApiRequest, NextApiResponse} from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {building_id} = req.query;

    if (req.method === 'GET') {
        try {
            console.log("Got get")
            const data = await executeQuery({query: "SELECT * FROM building WHERE id = $1", values: [building_id]});
            console.log(data)
            res.status(200).json(data);
        } catch (error: any) {
            res.status(500).json({error: error.message});
        }
    }

}
