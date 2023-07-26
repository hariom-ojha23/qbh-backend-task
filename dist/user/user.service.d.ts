import { Model } from "mongoose";
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { User } from 'src/schemas/user.schema';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    createNewUser(createUserDto: CreateUserDto): Promise<User>;
    getAllUsers(): Promise<User[]>;
    getUserById(id: string): Promise<User>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    deleteUser(id: string): Promise<User>;
}
