import executeQuery from '@/DB/connectDB';
import type { NextApiRequest, NextApiResponse } from 'next';
import {getMeeting} from "@/pages/api/v1/buildings/[building_id]/meetings";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { building_id, meeting_id } = req.query;


    // NOT IMPLEMENTED YET, WAITING FOR YUVAL
    if (req.method === 'POST') {
        try {
            try {
                const meeting = await getMeeting(building_id, meeting_id);
                // await SendNotification(meeting.google_id, meeting.date)
                res.status(200);
            } catch (error: any) {
                res.status(500).json({error: error.message});
            }

            res.status(201).json({message: 'Meeting created.'});
        } catch (error: any) {
            res.status(500).json({error: error.message});
        }
    }
}
