import { sql } from '@vercel/postgres';
import { Pool, Client } from 'pg'
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { building_id, meeting_id } = req.query;
    const meetingId = meeting_id as string;
    const buildingId = building_id as string;

    // GET - get specific meeting details
    if (req.method === 'GET') {

        try {
            const meetingResult = await sql`SELECT * FROM meetings WHERE building_id=${buildingId} AND id=${meetingId};`;
            return res.status(200).json({ meetings: meetingResult.rows });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    // PATCH - edit specific meeting details
    if (req.method === 'PATCH') {
        try {
            // Destructure the optional fields from the request body
            const { name, date, location, description, summary, users } = req.body;

            // Initialize query parameters and values arrays
            const queryParameters: string[] = [];
            const queryValues: any[] = [];

            if (name) {
                queryParameters.push('name = $' + (queryParameters.length + 1));
                queryValues.push(name);
            }
            if (date) {
                queryParameters.push('date = $' + (queryParameters.length + 1));
                queryValues.push(date);
            }
            if (location) {
                queryParameters.push('location = $' + (queryParameters.length + 1));
                queryValues.push(location);
            }
            if (description) {
                queryParameters.push('description = $' + (queryParameters.length + 1));
                queryValues.push(description);
            }
            if (summary) {
                queryParameters.push('summary = $' + (queryParameters.length + 1));
                queryValues.push(summary);
            }

            // Build and execute the SQL query for updating the meeting
            if (queryParameters.length > 0) {
                const updateQuery = `UPDATE meetings SET ${queryParameters.join(', ')} WHERE id = $${queryParameters.length + 1} AND building_id = $${queryParameters.length + 2}`;
                queryValues.push(meeting_id, building_id);
                // await executeQuery({ query: updateQuery, values: queryValues });
            }

            // Update user_meetings if "users" is provided
            if (Array.isArray(users)) {
                // Delete existing relationships for the meeting
                // await executeQuery({ query: `DELETE FROM user_meetings WHERE meeting_id = $1`, values: [meeting_id] });

                // Insert new relationships
                for (const user_id of users) {
                    // await executeQuery({
                    //     query: `INSERT INTO user_meetings (user_id, meeting_id) VALUES ($1, $2)`,
                    //     values: [user_id, meeting_id]
                    // });
                }
            }

            res.status(200).json({ message: 'Meeting updated.' });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}