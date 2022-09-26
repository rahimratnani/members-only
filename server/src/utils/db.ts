import 'dotenv/config';
import mongoose from 'mongoose';
import { exit } from 'process';

export const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL!);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error(error);
    exit(1);
  }
};

mongoose.connection.on('error', (err) => {
  console.error(err);
});
