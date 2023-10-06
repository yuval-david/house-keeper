import { sql } from '@vercel/postgres';
import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from "formidable";
import path from "path";
import fs from "fs/promises";

export const config = {
    api: {
        bodyParser: false,
    }
}


const readFile = (req: NextApiRequest, saveLocally: boolean)
    : Promise<{ fields: formidable.Fields; files: formidable.Files }> => {

    const { building_id, fault_id } = req.query;
    const faultId = fault_id as string;
    const buildingId = building_id as string;
    const options: formidable.Options = {};

    if (saveLocally) {
        try {
            options.uploadDir = path.join(process.cwd(), `/public/faults/${buildingId}/${faultId}`);
            // options.maxFileSize = 200000;
            options.filename = (name, ext, path, form) => {
                return "img.jpg";
            }
        } catch (error) {
            console.log("error uploading: ", error);
        }
    }

    const form = formidable(options);

    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({ fields, files });
        })
    })
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { building_id, fault_id } = req.query;
    const faultId = fault_id as string;
    const buildingId = building_id as string;

    if (req.method === 'POST') {

        // Check if directory exist. If not - create it
        try {
            await fs.readdir(path.join(process.cwd(), `/public/faults/${buildingId}/${faultId}`));

        } catch (error: any) {
            await fs.mkdir(path.join(process.cwd(), `/public/faults/${buildingId}/${faultId}`));
        }


        try {
            // Read file
            await readFile(req, true);
            res.json({ message: "Fault image uploaded successfuly" });
        } catch (error: any) {
            res.status(500).json({ message: "Error upload image." })
        }
    }



}