import 'dotenv/config';
import User from './../resources/user/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const newToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET);
};

const verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return payload;
  } catch (error) {
    return error;
  }
};

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'Email ,name & pass are required' });
  }

  try {
    // check if user already exist
    // Validate if user exist in the database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res
        .status(409)
        .json({ message: 'User already exists. Please login.' });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    // Create token
    const token = newToken(user);

    console.log(token);
    return res.status(201).json({ token, id: user.id });
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
};
