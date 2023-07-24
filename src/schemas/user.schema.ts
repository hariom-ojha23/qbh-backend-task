import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IUser } from 'src/interface/user.interface';

export type UserDocument = HydratedDocument<IUser>;

@Schema()
export class User {
    @Prop({ required: true, minlength: 2, maxlength: 10 })
    firstName: string;

    @Prop({ required: true, minlength: 2, maxlength: 10 })
    lastName: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true, max: 100, min: 1 })
    age: number;
}

export const UserSchema = SchemaFactory.createForClass(User);