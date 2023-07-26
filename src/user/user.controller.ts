import { Controller, Delete, Get, Post, Put, Body, Param, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { User } from 'src/schemas/user.schema';
import { UpdateUserDto } from 'src/dto/update-user.dto';

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }


    @Post()
    async createNewUser(@Res() response, @Body() createUserDto: CreateUserDto): Promise<User> {
        try {

            const user = await this.userService.createNewUser(createUserDto);
            return response.status(HttpStatus.CREATED).json({
                success: true,
                message: "User Created Successfully",
                user,
                statusCode: HttpStatus.CREATED

            })

        } catch (error) {

            return response.status(HttpStatus.BAD_REQUEST).json({
                success: false,
                errorStack: error,
                message: error.message,
                statusCode: HttpStatus.BAD_REQUEST

            })
        }
    }

    @Get()
    async getAllUsers(@Res() response): Promise<User[]> {

        try {
            const users = await this.userService.getAllUsers()
            return response.status(HttpStatus.FOUND).json({
                success: true,
                users,
                statusCode: HttpStatus.FOUND
            })
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                success: false,
                errorStack: error,
                message: error.message,
                statusCode: HttpStatus.BAD_REQUEST

            })
        }
    }

    @Get(":id")
    async getUserById(@Res() response, @Param('id') id: string): Promise<User> {

        try {

            const user = await this.userService.getUserById(id)

            return response.status(HttpStatus.FOUND).json({
                success: true,
                user,
                statusCode: HttpStatus.FOUND
            })

        } catch (error) {

            return response.status(HttpStatus.BAD_REQUEST).json({
                success: false,
                errorStack: error,
                message: error.message,
                statusCode: HttpStatus.BAD_REQUEST

            })
        }
    }

    @Put(":id")
    async updateUser(@Res() response, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        try {

            const user = await this.userService.updateUser(id, updateUserDto)
            return response.status(HttpStatus.CREATED).json({
                success: true,
                user,
                message: "User Updated Successfully",
                statusCode: HttpStatus.CREATED
            })
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                success: false,
                errorStack: error,
                message: error.message,
                statusCode: HttpStatus.BAD_REQUEST

            })
        }
    }

    @Delete(":id")
    async deleteUser(@Res() response, @Param('id') id: string): Promise<User> {

        try {

            const user = await this.userService.deleteUser(id)
            return response.status(HttpStatus.GONE).json({
                success: true,
                user,
                message: "User Deleted Successfully",
                statusCode: HttpStatus.GONE
            })
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                success: false,
                errorStack: error,
                message: error.message,
                statusCode: HttpStatus.BAD_REQUEST

            })
        }
    }


}
