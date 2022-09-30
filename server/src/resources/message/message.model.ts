import mongoose from 'mongoose';
import { IMessage } from './message.types';

const messageSchema = new mongoose.Schema<IMessage>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      minlength: 1,
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      minlength: 1,
    },
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: [true, 'Author is required'],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IMessage>('Message', messageSchema);
