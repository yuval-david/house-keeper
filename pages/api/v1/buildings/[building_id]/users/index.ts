import executeQuery from '@/DB/connectDB';
import type {NextApiRequest, NextApiResponse} from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {building_id} = req.query;

    if (req.method === 'GET') {
        try {
            const data = await executeQuery({
                query: "SELECT * FROM users WHERE building_id = $1",
                values: [building_id]
            });
            console.log(data)
            res.status(200).json(data);
        } catch (error: any) {
            res.status(500).json({error: error.message});
        }
    }

    if (req.method === 'POST') {
        try {
            const {
                name,
                phone,
                isVahadBait,
                email,
                apartment_floor,
                apartment_number,
                apartment_spm,
            } = req.body;
            const data = await executeQuery(
                {
                    query: `INSERT INTO users (name, phone, isVahadBait, email, apartment_floor, apartment_number, apartment_spm, building_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
                    values: [name, phone, isVahadBait, email, apartment_floor, apartment_number, apartment_spm, building_id]
                }
            );
            console.log(data)
            res.status(201).json({message: 'building created.'});
        } catch (error: any) {
            res.status(500).json({error: error.message});
        }
    }
}
