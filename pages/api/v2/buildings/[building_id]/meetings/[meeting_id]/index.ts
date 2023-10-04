import { sql } from '@vercel/postgres';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { building_id, meeting_id } = req.query;
    const meetingId = meeting_id as string;
    const buildingId = building_id as string;

    // GET - get specific meeting details
    if (req.method === 'GET') {

        try {
            const meetingResult = await sql`SELECT * FROM meetings WHERE building_id=${buildingId} AND id=${meetingId};`;

            // Fetch users associated with each meeting
            const usersData = await sql`SELECT user_id FROM user_meetings WHERE meeting_id = ${meetingId}`;
            meetingResult.rows[0].users = usersData.rows.map(row => row.user_id);

            return res.status(200).json({ meeting: meetingResult.rows[0] });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    // PATCH - edit specific meeting details
    if (req.method === 'PATCH') {
        try {
            // Destructure the optional fields from the request body
            const { name, date, location, description, summary, users } = req.body;

            if (name) {
                const nameUpdateResult = await sql`UPDATE meetings SET name = ${name} WHERE id = ${meetingId} AND building_id = ${buildingId};`;
                console.log(nameUpdateResult);
            }
            if (date) {
                const dateUpdateResult = await sql`UPDATE meetings SET date = ${date} WHERE id = ${meetingId} AND building_id = ${buildingId};`;
                console.log(dateUpdateResult);
            }
            if (location) {
                const locationUpdateResult = await sql`UPDATE meetings SET location = ${location} WHERE id = ${meetingId} AND building_id = ${buildingId};`;
                console.log(locationUpdateResult);
            }
            if (description) {
                const descriptionUpdateResult = await sql`UPDATE meetings SET description = ${description} WHERE id = ${meetingId} AND building_id = ${buildingId};`;
                console.log(descriptionUpdateResult);
            }
            if (summary) {
                const summaryUpdateResult = await sql`UPDATE meetings SET summary = ${summary} WHERE id = ${meetingId} AND building_id = ${buildingId};`;
                console.log(summaryUpdateResult);
            }

            // Update user_meetings if "users" is provided
            if (Array.isArray(users)) {
                // Delete existing relationships for the meeting
                const deleteResult = await sql`DELETE FROM user_meetings WHERE meeting_id = ${meetingId};`;
                console.log(deleteResult);

                // Insert new relationships
                for (const user_id of users) {
                    await sql`INSERT INTO user_meetings (user_id, meeting_id) VALUES (${user_id}, ${meetingId});`
                }
            }

            res.status(200).json({ message: 'Meeting updated.' });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}