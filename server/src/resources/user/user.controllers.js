export const me = (req, res) => {
  res.status(200).json({ user: req.user });
};
