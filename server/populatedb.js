import 'dotenv/config';
import mongoose from 'mongoose';
import User from './src/resources/user/user.model.js';

await mongoose.connect(process.env.DB_URL);

const rahim = await User.create({
  name: 'Rahim',
  username: 'rahim',
  email: 'example@email.com',
  password: '1995',
});

console.log(rahim);
