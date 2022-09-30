import User from './user.model';
import { Request, Response, NextFunction } from 'express';

export const me = (req: Request, res: Response) => {
  res.status(200).json({ user: req.user });
};

export const updateMe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const SECRET = process.env.MEMBERSHIP_CODE;

  try {
    if (SECRET === req.body.secret) {
      const updatedDoc = await User.findOneAndUpdate(
        { _id: req.params.id },
        { is_member: true },
        { new: true }
      )
        .select('-password')
        .lean();

      if (!updatedDoc) {
        return res.status(400).end();
      }

      return res.status(200).json({ user: updatedDoc });
    }

    return res.status(400).json({ message: 'Invalid secret.' });
  } catch (error) {
    console.error(error);
    res.status(500);
    next(error);
  }
};
