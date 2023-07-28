import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    timestamps: true
})
export class User {
    @Prop({
        required: true,
        minlength: 2,
        maxlength: 25
    })
    firstName: string;

    @Prop({
        required: true,
        minlength: 2,
        maxlength: 25
    })
    lastName: string;

    @Prop({
        unique: [true, 'Duplicate email entered, Try another email']
    })
    email: string;

    @Prop({
        required: true,
        max: 100,
        min: 1,
    })
    age: number;
}

export const UserSchema = SchemaFactory.createForClass(User);