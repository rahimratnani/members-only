export const signup = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'Email ,name & pass are required' });
  }

  return res.status(200).json({ message: 'Welcome', ...req.body });
};
