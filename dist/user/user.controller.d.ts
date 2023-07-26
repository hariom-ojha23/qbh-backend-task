import { UserService } from './user.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { User } from 'src/schemas/user.schema';
import { UpdateUserDto } from 'src/dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createNewUser(response: any, createUserDto: CreateUserDto): Promise<User>;
    getAllUsers(response: any): Promise<User[]>;
    getUserById(response: any, id: string): Promise<User>;
    updateUser(response: any, id: string, updateUserDto: UpdateUserDto): Promise<User>;
    deleteUser(response: any, id: string): Promise<User>;
}
