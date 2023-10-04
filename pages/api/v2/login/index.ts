import { sql } from '@vercel/postgres';
import { NextApiResponse, NextApiRequest } from 'next';


// Handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { email, password } = req.body;

    if (req.method === 'POST') {
        try {
            const data = await sql`SELECT * FROM users WHERE email = ${email};`;
            const actual_password = data.rows[0].password;
            if (password !== actual_password) {
                throw new Error("Wrong password.");
            }
            res.status(200).json({ user: data.rows[0] });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).end();
    }

}