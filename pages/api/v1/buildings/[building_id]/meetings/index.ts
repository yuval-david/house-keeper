import { sql } from '@vercel/postgres';
import { NextApiResponse, NextApiRequest } from 'next';

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse,
) {
    try {
        const meetings = await sql`SELECT * FROM meetings;`;
        return response.status(200).json({ meetings: meetings.rows });
    } catch (error) {
        return response.status(500).json({ error });
    }

}