import excuteQuery from '@/DB/connectDB';
import mysql from 'mysql2/promise';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const query = "SELECT * FROM meetings";
    const data = await excuteQuery({ query });
    res.status(200).json({ results: data });
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}