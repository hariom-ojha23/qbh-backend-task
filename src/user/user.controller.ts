import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Res,
    HttpStatus,
    NotFoundException,
    BadRequestException,
    Query
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @Get()
    async getAllUsers(
        @Res() res,
        @Query() query: ExpressQuery
    ): Promise<User[]> {
        try {
            const users = await this.userService.findAll(query)
            return res.status(HttpStatus.OK).json({
                success: true,
                statusCode: HttpStatus.OK,
                message: users.length > 0 ? "Users successfully found" : "Users not found",
                data: users
            })
        } catch (error) {
            throw new NotFoundException(error.message || 'Failed to fetch users');
        }
    }

    @Post()
    async createUser(
        @Res() res,
        @Body() user: CreateUserDto
    ): Promise<User> {
        try {
            const createdUser = await this.userService.create(user);
            return res.status(HttpStatus.CREATED).json({
                success: true,
                statusCode: HttpStatus.CREATED,
                message: "User successfully created",
                data: createdUser
            })
        } catch (error) {
            throw new BadRequestException(error.message || 'Failed to create user');
        }
    }

    @Get(":id")
    async getUser(
        @Res() res,
        @Param("id") id: string
    ): Promise<User> {
        try {
            const user = await this.userService.findById(id)
            return res.status(HttpStatus.OK).json({
                success: true,
                statusCode: HttpStatus.OK,
                message: "User data found",
                data: user
            })
        } catch (error) {
            throw new NotFoundException(error.message || 'Failed to fetch user');
        }
    }

    @Put(":id")
    async updateUser(
        @Res() res,
        @Body() user: UpdateUserDto,
        @Param("id") id: string
    ): Promise<User> {
        try {
            const updatedUser = await this.userService.updateById(id, user);
            if (!updatedUser) {
                throw new NotFoundException("Couldn't find any user with the given ID.");
            }
            return res.status(HttpStatus.OK).json({
                success: true,
                statusCode: HttpStatus.OK,
                message: "User data successfully updated",
                data: updatedUser
            })
        } catch (error) {
            throw new BadRequestException(error.message || 'Failed to update user');
        }
    }

    @Delete(":id")
    async deleteUser(
        @Res() res,
        @Param("id") id: string
    ): Promise<User> {
        try {
            const deletedUser = await this.userService.deleteById(id);
            if (!deletedUser) {
                throw new NotFoundException("Couldn't find any user with the given ID.");
            }
            return res.status(HttpStatus.OK).json({
                success: true,
                statusCode: HttpStatus.OK,
                message: "User data successfully deleted",
                data: deletedUser
            })
        } catch (error) {
            throw new BadRequestException(error.message || 'Failed to delete user');
        }
    }
}
