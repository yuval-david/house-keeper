import type { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { building_id } = req.query;
    const buildingId = building_id as string;

    // POST
    if (req.method === 'POST') {
        try {
            const { name, representativeName, phone, email, paymentName, paymentAccountNumber, paymentBankName, paymentBranch } = req.body;
            const data = await sql`
            INSERT INTO management_information 
            (building_id, name, representativename, phone, email, paymentname, paymentaccountnumber, paymentbankname, paymentbranch) 
            VALUES 
            (${buildingId}, ${name}, ${representativeName}, ${phone}, ${email}, ${paymentName}, ${paymentAccountNumber}, ${paymentBankName}, ${paymentBranch});`;
            res.status(201).json({ message: 'Management company information created.' });

        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    // GET
    else if (req.method === 'GET') {
        try {
            const data = await sql`SELECT * FROM management_information WHERE building_id = ${buildingId}`;
            res.status(200).json({ information: data.rows });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }

    } else {
        res.status(405).end();  // Method Not Allowed
    }
}