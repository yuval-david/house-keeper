import executeQuery from '@/DB/connectDB';
import type {NextApiRequest, NextApiResponse} from 'next';
import {getMeeting} from "@/pages/api/v1/buildings/[building_id]/meetings";
import {createMeeting} from "@/DB/meeting";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {building_id, meeting_id} = req.query;
    const {email} = req.body;

    if (req.method === 'POST') {
        try {
            try {
                let meeting = await getMeeting(building_id, meeting_id);
                meeting.users = [email]
                await createMeeting(meeting)
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
