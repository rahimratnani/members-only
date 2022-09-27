import { Types } from 'mongoose';

export interface IMessage {
  title: string;
  message: string;
  author: Types.ObjectId;
}
