import { sql } from '@vercel/postgres';
import { NextApiResponse, NextApiRequest } from 'next';

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse,
) {

    try {
        const { name: meetingName, date: meetingDate, time, location, description, summary } = request.body;
        // if (!meetingDate || !location) throw new Error('Meeting details are missing.'); // Another way to handle validation
        if (!meetingDate || !location || !time) {
            return response.status(400).json({ response: { message: 'Meeting details are missing.' } });
        }

        const res = await sql`INSERT INTO meetings (name, date, time, location, description, summary) VALUES (${meetingName}, ${meetingDate}, ${time}, ${location}, ${description}, ${summary});`;

        // INSERT successfully
        if (res.rowCount > 0) {
            return response.status(200).json({ response: res });
        } else {
            throw new Error('There is sql error during adding new meeting.')
        }

    } catch (error) {
        console.log(error);
        return response.status(500).json({ error });
    }

}