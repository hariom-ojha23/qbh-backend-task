import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import * as mongoose from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { Query } from 'express-serve-static-core';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private userModel: mongoose.Model<User>
    ) { }


    async findAll(query: Query): Promise<User[]> {
        try {
            const resPerPage = 2;
            const currentPage = Number(query.page) || 1;
            const skip = resPerPage * (currentPage - 1);

            const name = query.name
                ? {
                    $or: [
                        { firstName: { $regex: query.name, $options: 'i' } },
                        { lastName: { $regex: query.name, $options: 'i' } }
                    ]
                }
                : {};
            const users = await this.userModel.find({ ...name })
                .limit(resPerPage)
                .skip(skip);
            return users;
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    async create(user: User): Promise<User> {
        try {
            const emailExist = await this.userModel.findOne({ email: user.email })
            if (emailExist) {
                throw new BadRequestException('Email already taken. Please choose a different email address.');
            }
            const createdUser = await this.userModel.create(user);
            return createdUser;
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new Error('Unexpected error occurred.');
        }
    }

    async findById(id: string): Promise<User> {
        try {
            const isValidId = mongoose.isValidObjectId(id);

            if (!isValidId) {
                throw new BadRequestException('Please enter valid id.');
            }

            const user = await this.userModel.findById(id);

            if (!user) {
                throw new NotFoundException('User not found.');
            }
            return user;
        } catch (error) {
            if (error instanceof BadRequestException || error instanceof NotFoundException) {
                throw error;
            }
            throw new Error('Unexpected error occurred.');
        }
    }

    async updateById(id: string, user: UpdateUserDto): Promise<User> {
        try {
            const emailExist = await this.userModel.findOne({ email: user.email, _id: { $ne: id }})
            if (emailExist) {
                console.log(emailExist)
                throw new BadRequestException('Email already taken. Please choose a different email address.');
            }
            const updatedUser = await this.userModel.findOneAndUpdate({
                _id: id
            }, user, { new: true });
            return updatedUser;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async deleteById(id: string): Promise<User> {
        try {
            const deletedUser = await this.userModel.findByIdAndDelete(id)
            return deletedUser;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}
