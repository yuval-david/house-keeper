import executeQuery from '@/DB/connectDB';
import type {NextApiRequest, NextApiResponse} from 'next';
import {getMeeting} from "@/pages/api/v1/buildings/[building_id]/meetings";
import {createMeeting} from "@/DB/meeting";
import {stat} from "fs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {building_id, meeting_id} = req.query;
    const {email, status} = req.body;

    if (req.method === 'PUT') {
        try {
            try {
                await executeQuery({
                    query: `UPDATE user_meetings SET status = $1 WHERE email = $2 AND meeting_id = $3`,
                    values: [status, email, meeting_id]
                });

                res.status(200);
            } catch (error: any) {
                res.status(500).json({error: error.message});
            }

            res.status(201).json({message: 'Meeting created.'});
        } catch (error: any) {
            res.status(500).json({error: error.message});
        }
    } else {
        res.status(405).end();  // Method Not Allowed
    }
}
