import { sql } from '@vercel/postgres';
import { NextApiResponse, NextApiRequest } from 'next';


// Handler
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {

    // Get Query Parameters
    const { building_id } = req.query;
    const buildingId = building_id as string;


    // GET 
    if (req.method === 'GET') {
        try {
            const meetings = await sql`SELECT * FROM meetings WHERE building_id = ${buildingId};`;

            // Fetch users associated with each meeting
            for (const meeting of meetings.rows) {
                const usersData = await sql`SELECT user_id FROM user_meetings WHERE meeting_id = ${meeting.id}`;
                meeting.users = usersData.rows.map(row => row.user_id);
            }


            return res.status(200).json({ meetings: meetings.rows });

        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    // POST
    if (req.method === 'POST') {

        try {
            const { name: meetingName, date: meetingDate, time, location, description, summary } = req.body;
            if (!meetingDate || !location || !time) {
                return res.status(400).json({ message: 'Meeting details are missing.' });
            }

            const result = await sql`
            INSERT INTO meetings (name, date, time, location, description, summary, building_id) 
            VALUES (${meetingName}, ${meetingDate}, ${time}, ${location}, ${description}, ${summary}, ${buildingId}) 
            RETURNING id;
            `;

            // CHECK IF THIS PART NEEDED
            // const resultData = result.rows;
            // const meeting_id = resultData[0]?.id;

            // Insert users into user_meetings
            // for (const user_id of users) {
            //     await executeQuery({
            //         query: `INSERT INTO user_meetings (user_id, meeting_id) VALUES ($1, $2)`,
            //         values: [user_id, meeting_id]
            //     });
            // }

            res.status(201).json({ message: 'Meeting created.' });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

}