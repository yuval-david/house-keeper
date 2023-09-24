import executeQuery from '@/DB/connectDB';
import type {NextApiRequest, NextApiResponse} from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {building_id} = req.query;

    if (req.method === 'GET') {
        try {
            const data = await executeQuery({
                query: `SELECT * FROM meetings WHERE building_id = $1`,
                values: [building_id]
            });

            // Fetch users associated with each meeting
            for (const meeting of data) {
                const usersData = await executeQuery({
                    query: `SELECT user_id FROM user_meetings WHERE meeting_id = $1`,
                    values: [meeting.id]
                });
                meeting.users = usersData.map(row => row.user_id);
            }

            res.status(200).json({meetings: data});
        } catch (error: any) {
            res.status(500).json({error: error.message});
        }
    }

    if (req.method === 'POST') {
        try {
            const {name, date, location, users, description, summary} = req.body;
            // Insert the meeting first
            const data = await executeQuery({
                query: `INSERT INTO meetings (name, date, location, description, summary, building_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
                values: [name, date, location, description, summary, building_id]
            });

            const meeting_id = data[0]?.id;

            // Insert users into user_meetings
            for (const user_id of users) {
                await executeQuery({
                    query: `INSERT INTO user_meetings (user_id, meeting_id) VALUES ($1, $2)`,
                    values: [user_id, meeting_id]
                });
            }

            res.status(201).json({message: 'Meeting created.'});
        } catch (error: any) {
            res.status(500).json({error: error.message});
        }
    }
}
