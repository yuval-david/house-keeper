import { sql } from '@vercel/postgres';
import { NextApiResponse, NextApiRequest } from 'next';

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse,
) {

    try {
        // GET 
        if (request.method === 'GET') {
            const meetings = await sql`SELECT * FROM meetings;`;
            return response.status(200).json({ meetings: meetings.rows });
        }

        // POST
        // if (request.method === 'POST') {
        //     const meetingName = request.query.meetingName as string;
        //     const meetingDate = request.query.meetingDate as string;
        //     const location = request.query.location as string;
        //     const description = request.query.meetingDate as string;
        //     if (!meetingName || !meetingDate || !location) throw new Error('Meeting details are missing.');
        //     await sql`INSERT INTO meetings (name, date, location, description) VALUES (${meetingName}, ${meetingDate}, ${location}, ${description});`;

        //     const meetings = await sql`SELECT * FROM meetings;`;
        //     return response.status(200).json({ meetings: meetings.rows });
        // }

    } catch (error) {
        return response.status(500).json({ error });
    }

}