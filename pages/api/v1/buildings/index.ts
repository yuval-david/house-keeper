import executeQuery from '@/DB/connectDB';
import type {NextApiRequest, NextApiResponse} from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            console.log("Got get")
            const data = await executeQuery({query: "SELECT * FROM building", values: []});
            console.log(data)
            res.status(200).json({building: data});
        } catch (error: any) {
            res.status(500).json({error: error.message});
        }
    }

    if (req.method === 'POST') {
        try {
            const {street, number, city} = req.body;
            console.log(req.body)
            console.log(street, number, city)
            const data = await executeQuery(
                {
                    query: `INSERT INTO building (street, number, city) VALUES ($1, $2, $3)`,
                    values: [street, number, city]
                }
            );
            console.log(data)
            res.status(201).json({message: 'building created.'});
        } catch (error: any) {
            res.status(500).json({error: error.message});
        }
    }
}
