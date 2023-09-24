import executeQuery from '@/DB/connectDB';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { building_id } = req.query;

    if (req.method === 'PUT') {
        try {
            const {
                name,
                representativeName,
                phone,
                email,
                paymentName,
                paymentAccountNumber,
                paymentBankName,
                paymentBranch
            } = req.body;

            // Check if a row already exists for this building_id
            const existingRow = await executeQuery({
                query: 'SELECT * FROM management_information WHERE building_id = $1',
                values: [building_id]
            });

            if (existingRow.length > 0) {
                // Update the existing row
                await executeQuery({
                    query: `UPDATE management_information 
                            SET name = $1, representativeName = $2, phone = $3, email = $4, 
                                paymentName = $5, paymentAccountNumber = $6, paymentBankName = $7, paymentBranch = $8
                            WHERE building_id = $9`,
                    values: [
                        name, representativeName, phone, email, paymentName,
                        paymentAccountNumber, paymentBankName, paymentBranch, building_id
                    ]
                });
            } else {
                // Insert a new row
                await executeQuery({
                    query: `INSERT INTO management_information 
                            (building_id, name, representativeName, phone, email, paymentName, 
                            paymentAccountNumber, paymentBankName, paymentBranch) 
                            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
                    values: [
                        building_id, name, representativeName, phone, email, paymentName,
                        paymentAccountNumber, paymentBankName, paymentBranch
                    ]
                });
            }

            res.status(200).json({
                name,
                representativeName,
                phone,
                email,
                paymentName,
                paymentAccountNumber,
                paymentBankName,
                paymentBranch
            });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).end(); // Method not allowed
    }
}
