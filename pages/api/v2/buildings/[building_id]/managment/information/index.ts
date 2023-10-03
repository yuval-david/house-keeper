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

        // PUT
    } else if (req.method === "PUT") {
        try {
            const {
                name,
                representativename,
                phone,
                email,
                paymentname,
                paymentaccountnumber,
                paymentbankname,
                paymentbranch
            } = req.body;

            if (name) {
                const nameUpdateResult = await sql`UPDATE management_information SET name = ${name} WHERE building_id = ${buildingId};`;
                console.log(nameUpdateResult);
            }
            if (representativename) {
                const representativeNameUpdateResult = await sql`UPDATE management_information SET representativename = ${representativename} WHERE building_id = ${buildingId};`;
                console.log(representativeNameUpdateResult);
            }
            if (phone) {
                const phoneUpdateResult = await sql`UPDATE management_information SET phone = ${phone} WHERE building_id = ${buildingId};`;
                console.log(phoneUpdateResult);
            }
            if (email) {
                const emailUpdateResult = await sql`UPDATE management_information SET email = ${email} WHERE building_id = ${buildingId};`;
                console.log(emailUpdateResult);
            }
            if (paymentname) {
                const paymentNameUpdateResult = await sql`UPDATE management_information SET paymentname = ${paymentname} WHERE building_id = ${buildingId};`;
                console.log(paymentNameUpdateResult);
            }
            if (paymentaccountnumber) {
                const paymentAccountNumberUpdateResult = await sql`UPDATE management_information SET paymentaccountnumber = ${paymentaccountnumber} WHERE building_id = ${buildingId};`;
                console.log(paymentAccountNumberUpdateResult);
            }
            if (paymentbankname) {
                const paymentBankNameUpdateResult = await sql`UPDATE management_information SET paymentbankname = ${paymentbankname} WHERE building_id = ${buildingId};`;
                console.log(paymentBankNameUpdateResult);
            }
            if (paymentbranch) {
                const paymentBranchUpdateResult = await sql`UPDATE management_information SET paymentbranch = ${paymentbranch} WHERE building_id = ${buildingId};`;
                console.log(paymentBranchUpdateResult);
            }

            res.status(200).json({ message: 'Company information updated.' });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    else {
        res.status(405).end();  // Method Not Allowed
    }
}