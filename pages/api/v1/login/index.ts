import executeQuery from '@/DB/connectDB';
import type {NextApiRequest, NextApiResponse} from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {email, password} = req.body;

    if (req.method === 'POST') {
        try {
            const data = await executeQuery({query: "SELECT * FROM users WHERE email = $1", values: [email]});
            console.log(data)
            const actual_password = data[0].password;
            if (password == actual_password) {
                res.status(200).json(data[0]);
            }
            res.status(400).json("invalid user credentials");
        } catch (error: any) {
            res.status(500).json({error: error.message});
        }
    } else {
        res.status(405).end();
    }

}
