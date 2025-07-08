import UserData from '../models/datamodel';
import { Request, Response } from 'express';

export const getUserData = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const data = await UserData.findOne({ userId });
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};