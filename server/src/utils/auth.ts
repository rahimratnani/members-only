import User from './../resources/user/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { HydratedDocument } from 'mongoose';
import { IUser } from '../resources/user/user.types';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET = process.env.JWT_SECRET!;

const newToken = (user: HydratedDocument<IUser>) => {
  return jwt.sign({ id: user.id }, JWT_SECRET, {
    expiresIn: '1d',
  });
};

const verifyToken = (token: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (error, payload) => {
      if (error) return reject(error);

      resolve(payload);
    });
  });
};

const checkPassword = async (passwordHash: string, password: string) => {
  try {
    return await bcrypt.compare(password, passwordHash);
  } catch (error) {
    throw error;
  }
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    const user: HydratedDocument<IUser> = await User.create({
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    // Create token
    const token = newToken(user);

    const updatedUser: { [key: string]: any } = user.toObject();

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

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Email and password are required.' });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(401).json({ message: 'Not authorized.' });
    }

    const match = await checkPassword(user.password, password);

    if (!match) {
      return res.status(401).json({ message: 'Not authorized.' });
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

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Not authorized.' });
  }

  const token = req.headers.authorization.split(' ')[1];

  if (!token || token.length < 10) {
    return res.status(401).json({ message: 'Not authorized.' });
  }

  try {
    const payload = await verifyToken(token);

    if (!payload) {
      return res.status(401).json({ message: 'Not authorized.' });
    }

    const user = await User.findById((payload as any).id)
      .select('-password')
      .lean()
      .exec();

    if (!user) {
      return res.status(401).json({ message: 'Not authorized.' });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(error);

    if (error instanceof Error && error.message === 'jwt expired') {
      return res.status(401).json({ message: 'Not authorized.' });
    }

    res.status(500);
    next(error);
  }
};
