import { sql } from '@vercel/postgres';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { building_id, fault_id } = req.query;
    const faultId = fault_id as string;
    const buildingId = building_id as string;

    // GET - get specific fault details
    if (req.method === 'GET') {

        try {
            const faultResult = await sql`SELECT * FROM faults WHERE building_id=${buildingId} AND id=${faultId};`;
            return res.status(200).json({ fault: faultResult.rows[0] });

        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    // PATCH - edit specific meeting details
    if (req.method === 'PATCH') {
        try {
            // Destructure the optional fields from the request body
            const { name, severity, urgency, location, status, handledBy, vendor, price } = req.body;

            if (name) {
                const nameUpdateResult = await sql`UPDATE faults SET name = ${name} WHERE id = ${faultId} AND building_id = ${buildingId};`;
                console.log(nameUpdateResult);
            }
            if (severity) {
                const severityUpdateResult = await sql`UPDATE faults SET severity = ${severity} WHERE id = ${faultId} AND building_id = ${buildingId};`;
                console.log(severityUpdateResult);
            }
            if (urgency) {
                const urgencyUpdateResult = await sql`UPDATE faults SET urgency = ${urgency} WHERE id = ${faultId} AND building_id = ${buildingId};`;
                console.log(urgencyUpdateResult);
            }
            if (location) {
                const locationUpdateResult = await sql`UPDATE faults SET location = ${location} WHERE id = ${faultId} AND building_id = ${buildingId};`;
                console.log(locationUpdateResult);
            }
            if (status) {
                const statusUpdateResult = await sql`UPDATE faults SET status = ${status} WHERE id = ${faultId} AND building_id = ${buildingId};`;
                console.log(statusUpdateResult);
            }
            if (handledBy) {
                const handledByUpdateResult = await sql`UPDATE faults SET handledBy = ${handledBy} WHERE id = ${faultId} AND building_id = ${buildingId};`;
                console.log(handledByUpdateResult);
            }
            if (vendor) {
                const vendorUpdateResult = await sql`UPDATE faults SET vendor = ${vendor} WHERE id = ${faultId} AND building_id = ${buildingId};`;
                console.log(vendorUpdateResult);
            }
            if (price) {
                const priceUpdateResult = await sql`UPDATE faults SET price = ${price} WHERE id = ${faultId} AND building_id = ${buildingId};`;
                console.log(priceUpdateResult);
            }


            res.status(200).json({ message: 'Fault updated.' });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }


    // if (req.method === 'DELETE') {
    //     try {
    //         await executeQuery({
    //             query: 'DELETE FROM faults WHERE id = $1 AND building_id = $2',
    //             values: [fault_id, building_id],
    //         });
    //         res.status(200).json({ message: 'Fault deleted.' });
    //     } catch (error: any) {
    //         res.status(500).json({ error: error.message });
    //     }
    // }

}