import { Document, Types } from 'mongoose';
export interface IUser extends Document {
    _id: Types.ObjectId;
    fullName: string;
    lastName: string;
    email: string;
    age: number;
}
