import 'dotenv/config';
import User from './../resources/user/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const newToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET);
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
      if (error) return reject(error);

      resolve(payload);
    });
  });
};

const checkPassword = async (passwordHash, password) => {
  try {
    return await bcrypt.compare(password, passwordHash);
  } catch (error) {
    throw new Error(error);
  }
};

export const signup = async (req, res, next) => {
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

    const updatedUser = user.toObject();
    delete updatedUser.password;

    return res.status(201).json({
      token,
      ...updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500);
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .send({ message: 'Email and password are required.' });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(401).send({ message: 'Not authorized.' });
    }

    const match = await checkPassword(user.password, password);

    if (!match) {
      return res.status(401).send({ message: 'Not authorized.' });
    }

    const token = newToken(user);

    const updatedUser = user.toObject();
    delete updatedUser.password;

    return res.status(201).json({
      token,
      ...updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500);
    next(error);
  }
};

export const protect = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: 'Not authorized.' });
  }

  let token = req.headers.authorization.split('Bearer ')[1];

  if (!token) {
    return res.status(401).send({ message: 'Not authorized.' });
  }

  try {
    const payload = await verifyToken(token);

    const user = await User.findById(payload.id)
      .select('-password')
      .lean()
      .exec();

    if (!user) {
      return res.status(401).send({ message: 'Not authorized.' });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    res.status(500);
    next(error);
  }
};
