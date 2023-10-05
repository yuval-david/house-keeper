import { sql } from '@vercel/postgres';
import type { NextApiRequest, NextApiResponse } from 'next';
// import formidable from "formidable";

export const config = {
    api: {
        bodyParser: false,
    }
}


const readFile = (req: NextApiRequest) => {
    // const form = formidable();
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { building_id, fault_id } = req.query;
    const faultId = fault_id as string;
    const buildingId = building_id as string;

    // const form = formidable({

    // })

    // POST - upload image to specific meeting
    if (req.method === 'POST') {

        try {
            const faultResult = await sql`SELECT * FROM faults WHERE building_id=${buildingId} AND id=${faultId};`;
            return res.status(200).json({ fault: faultResult.rows[0] });

        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

}