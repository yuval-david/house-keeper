import { sql } from '@vercel/postgres';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { building_id } = req.query;
    const buildingId = building_id as string;

    // GET
    if (req.method === 'GET') {
        try {
            const data = await sql`SELECT * FROM users WHERE building_id = ${buildingId};`;
            console.log(data);
            res.status(200).json({ users: data.rows });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    // POST
    if (req.method === 'POST') {
        try {
            const {
                id_number,
                name,
                phone,
                isVahadBait,
                isManagementCompany,
                email,
                apartment_floor,
                apartment_number,
                apartment_spm,
            } = req.body;

            const data = await sql`
            INSERT INTO users 
            (id_number, name, phone, isVahadBait, isManagementCompany, email, apartment_floor, apartment_number, apartment_spm, building_id) 
            VALUES 
            (${id_number}, ${name}, ${phone}, ${isVahadBait}, ${isManagementCompany}, ${email}, ${apartment_floor}, ${apartment_number}, ${apartment_spm}, ${buildingId})
            ;`;
            console.log(data);

            res.status(201).json({ message: 'User created.' });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}