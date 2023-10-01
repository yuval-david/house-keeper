// faults.ts
import executeQuery from '@/DB/connectDB'; // Adjust this import to your project structure
import type {NextApiRequest, NextApiResponse} from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {building_id, fault_id} = req.query;

    if (req.method === 'PATCH') {
        try {
            const {
                details,
                severity,
                location,
                status,
                handledBy,
                vendor,
                price
            } = req.body;

            let updateFields = '';
            let values: any[] = [];
            let placeholderCount = 1;

            if (details !== undefined) {
                updateFields += `details = $${placeholderCount}, `;
                values.push(details);
                placeholderCount++;
            }

            if (severity !== undefined) {
                updateFields += `severity = $${placeholderCount}, `;
                values.push(severity);
                placeholderCount++;
            }

            if (location !== undefined) {
                updateFields += `location = $${placeholderCount}, `;
                values.push(location);
                placeholderCount++;
            }

            if (status !== undefined) {
                updateFields += `status = $${placeholderCount}, `;
                values.push(status);
                placeholderCount++;
            }

            if (handledBy !== undefined) {
                updateFields += `handledBy = $${placeholderCount}, `;
                values.push(handledBy);
                placeholderCount++;
            }

            if (vendor !== undefined) {
                updateFields += `vendor = $${placeholderCount}, `;
                values.push(vendor);
                placeholderCount++;
            }

            if (price !== undefined) {
                updateFields += `price = $${placeholderCount}, `;
                values.push(price);
                placeholderCount++;
            }

            // Remove the last comma and space
            updateFields = updateFields.slice(0, -2);

            // If there are no fields to update, return an error
            if (updateFields === '') {
                return res.status(400).json({error: 'No fields to update'});
            }

            values.push(fault_id, building_id);
            const query = `UPDATE faults SET ${updateFields} WHERE id = $${placeholderCount} AND building_id = $${placeholderCount + 1}`;

            await executeQuery({query, values});

            res.status(200).json({message: 'Fault updated.'});
        } catch (error: any) {
            res.status(500).json({error: error.message});
        }
    } else if (req.method === 'DELETE') {
        try {
            await executeQuery({
                query: 'DELETE FROM faults WHERE id = $1 AND building_id = $2',
                values: [fault_id, building_id],
            });
            res.status(200).json({message: 'Fault deleted.'});
        } catch (error: any) {
            res.status(500).json({error: error.message});
        }
    } else {
        res.status(405).end();  // Method Not Allowed
    }
}
