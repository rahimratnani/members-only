export const getOne = async () => {};

export const getMany = async (req, res) => {
  return res.status(200).json({ data: req.data });
};

export const createOne = async () => {};

export const updateOne = async () => {};

export const deleteOne = async () => {};
