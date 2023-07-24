import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { IUser } from 'src/interface/user.interface';
import { User } from 'src/schemas/user.schema';



@Injectable()
export class UserService {

    constructor(@InjectModel("User") private readonly userModel: Model<User>) { }


    async createNewUser(createUserDto: CreateUserDto): Promise<User> {
        return await this.userModel.create(createUserDto)

    }


    async getAllUsers(): Promise<User[]> {
        return await this.userModel.find();
    }

    async getUserById(id: string): Promise<User> {

        return await this.userModel.findOne({ _id: id })

    }

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {

        if (updateUserDto.email) {
            const isEmailExist = await this.userModel.findOne({ email: updateUserDto.email })

            if (isEmailExist) {
                throw new Error("email id is already in use")
            }
        }

        return await this.userModel.findByIdAndUpdate({ _id: id }, updateUserDto, {
            new: true
        })
    }

    async deleteUser(id: string): Promise<User> {
        return await this.userModel.findByIdAndDelete({ _id: id })
    }


}
