"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("../dto/create-user.dto");
const update_user_dto_1 = require("../dto/update-user.dto");
let UserController = exports.UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async createNewUser(response, createUserDto) {
        try {
            const user = await this.userService.createNewUser(createUserDto);
            return response.status(common_1.HttpStatus.CREATED).json({
                success: true,
                message: "User Created Successfully",
                user,
                statusCode: common_1.HttpStatus.CREATED
            });
        }
        catch (error) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                success: false,
                errorStack: error,
                message: error.message,
                statusCode: common_1.HttpStatus.BAD_REQUEST
            });
        }
    }
    async getAllUsers(response) {
        try {
            const users = await this.userService.getAllUsers();
            return response.status(common_1.HttpStatus.FOUND).json({
                success: true,
                users,
                statusCode: common_1.HttpStatus.FOUND
            });
        }
        catch (error) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                success: false,
                errorStack: error,
                message: error.message,
                statusCode: common_1.HttpStatus.BAD_REQUEST
            });
        }
    }
    async getUserById(response, id) {
        try {
            const user = await this.userService.getUserById(id);
            return response.status(common_1.HttpStatus.FOUND).json({
                success: true,
                user,
                statusCode: common_1.HttpStatus.FOUND
            });
        }
        catch (error) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                success: false,
                errorStack: error,
                message: error.message,
                statusCode: common_1.HttpStatus.BAD_REQUEST
            });
        }
    }
    async updateUser(response, id, updateUserDto) {
        try {
            const user = await this.userService.updateUser(id, updateUserDto);
            return response.status(common_1.HttpStatus.CREATED).json({
                success: true,
                user,
                message: "User Updated Successfully",
                statusCode: common_1.HttpStatus.CREATED
            });
        }
        catch (error) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                success: false,
                errorStack: error,
                message: error.message,
                statusCode: common_1.HttpStatus.BAD_REQUEST
            });
        }
    }
    async deleteUser(response, id) {
        try {
            const user = await this.userService.deleteUser(id);
            return response.status(common_1.HttpStatus.GONE).json({
                success: true,
                user,
                message: "User Deleted Successfully",
                statusCode: common_1.HttpStatus.GONE
            });
        }
        catch (error) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                success: false,
                errorStack: error,
                message: error.message,
                statusCode: common_1.HttpStatus.BAD_REQUEST
            });
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createNewUser", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Put)(":id"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map