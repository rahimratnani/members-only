import mongoose from 'mongoose';
import { IUser } from './user.types';

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: 1,
    maxlength: 100,
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
    trim: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  is_member: {
    type: Boolean,
    default: false,
  },
  is_admin: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model<IUser>('User', userSchema);
