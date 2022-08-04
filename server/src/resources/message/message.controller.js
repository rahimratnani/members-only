import Message from './message.model.js';

// export const getOne = async () => {};

export const getMany = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;

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

export const createOne = async (req, res, next) => {
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

export const deleteOne = async (req, res, next) => {
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
