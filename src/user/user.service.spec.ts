import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { User } from '../user/schema/user.schema';

describe('UserService', () => {
    let userService: UserService;
    let model: Model<User>;

    const mockUser = {
        _id: '61c0ccf11d7bf83d153d7c06',
        firstName: "Jhon",
        lastName: "Doe",
        email: "jhondoe@gmail.com",
        age: 22
    };


    const mockUserService = {
        find: jest.fn(),
        create: jest.fn(),
        findById: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        findByIdAndDelete: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getModelToken(User.name),
                    useValue: mockUserService,
                },
            ],
        }).compile();

        userService = module.get<UserService>(UserService);
        model = module.get<Model<User>>(getModelToken(User.name));
    });

    describe('findAll', () => {
        it('should return an array of users', async () => {
            const mockUser = { firstName: 'John', lastName: 'Doe' };
            const query = { page: '1', name: 'test' };

            jest.spyOn(model, 'find').mockImplementation(() =>
            ({
                limit: () => ({
                    skip: jest.fn().mockResolvedValue([mockUser]),
                }),
            } as any),
            );

            const result = await userService.findAll(query);

            expect(model.find).toHaveBeenCalledWith({
                $or: [
                    { firstName: { $regex: 'test', $options: 'i' } },
                    { lastName: { $regex: 'test', $options: 'i' } },
                ],
            });

            expect(result).toEqual([mockUser]);
        });

        it('should throw an error for unexpected errors', async () => {

            jest.spyOn(model, 'find').mockImplementation(() => {
                throw new Error('Unexpected error occurred.');
            });

            await expect(userService.findAll({})).rejects.toThrow(Error);
        });
    });

    describe('findById', () => {
        it('should find and return a user by ID', async () => {
            jest.spyOn(model, 'findById').mockResolvedValue(mockUser);

            const result = await userService.findById(mockUser._id);

            expect(model.findById).toHaveBeenCalledWith(mockUser._id);
            expect(result).toEqual(mockUser);
        });

        it('should throw BadRequestException if invalid ID is provided', async () => {
            const id = 'invalid-mongoose-id';

            const isValidObjectIDMock = jest
                .spyOn(mongoose, 'isValidObjectId')
                .mockReturnValue(false);

            await expect(userService.findById(id)).rejects.toThrow(
                BadRequestException,
            );

            expect(isValidObjectIDMock).toHaveBeenCalledWith(id);
            isValidObjectIDMock.mockRestore();
        });

        it('should throw NotFoundException if user is not found', async () => {
            jest.spyOn(model, 'findById').mockResolvedValue(null);

            await expect(userService.findById(mockUser._id)).rejects.toThrow(
                NotFoundException,
            );

            expect(model.findById).toHaveBeenCalledWith(mockUser._id);
        });

        it('should throw an error for unexpected errors', async () => {
            jest.spyOn(model, 'findById').mockImplementation(() => {
                throw new Error('Unexpected error occurred.');
            });

            await expect(userService.findById(mockUser._id)).rejects.toThrow(
                Error,
            );

            expect(model.findById).toHaveBeenCalledWith(mockUser._id);
        });
    });
});