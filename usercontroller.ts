import User from '../models/usermodel';
import UserData from '../models/datamodel';
import { Request, Response } from 'express';

export const registerUser = async (req: Request, res: Response): Promise<void> =>  {
  try {
    const { email, password, role, name } = req.body;
    const user = await User.create({ email, password, role, name });

    await UserData.create({ userId: user._id });

    res.status(201).json({ message: 'User registered', user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// export const loginUser = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user || user.password !== password) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }
//     res.json({ message: 'Login successful', user });
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };


export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      res.status(401).json({ error: 'Invalid credentials' });
      return; // Just end execution, don't return the res itself
    }

    res.json({ message: 'Login successful', user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

