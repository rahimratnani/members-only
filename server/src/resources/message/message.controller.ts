import Message from './message.model';
import { Request, Response, NextFunction } from 'express';

export const getMany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.query.page || !req.query.limit) {
    return res
      .status(404)
      .json({ error: 'Page or limit parameter not found.' });
  }

  if (
    typeof req.query.page !== 'string' ||
    typeof req.query.limit !== 'string'
  ) {
    return res.status(500).json({ error: 'Invalid page or limit type.' });
  }

  const page: number = Number(req.query.page);
  const limit: number = Number(req.query.limit);

  try {
    // execute query with page and limit values
    const messages = await Message.find()
      .sort({ updatedAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .populate('author', '-password');

    // get total documents in the Posts collection
    const count = await Message.countDocuments();

    return res.status(200).json({
      messages,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error(error);
    res.status(500);
    next(error);
  }
};

export const createOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, message } = req.body;

  if (!title || !message) {
    return res.status(400).json({ message: 'Title and message are required.' });
  }

  try {
    const doc = await Message.create({ title, message, author: req.user._id });

    return res.status(201).json({ data: doc });
  } catch (error) {
    console.error(error);
    res.status(500);
    next(error);
  }
};

export const deleteOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).end();
  }

  if (!req?.user.is_admin) {
    return res.status(401).json({ message: 'Not authorized.' });
  }

  try {
    const deletedMsg = await Message.findOneAndRemove({
      _id: id,
    });

    if (!deletedMsg) {
      return res.status(400).end();
    }

    return res.status(200).json({ data: deletedMsg });
  } catch (error) {
    console.error(error);
    res.status(500);
    next(error);
  }
};
