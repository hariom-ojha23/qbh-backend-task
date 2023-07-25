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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let UserService = exports.UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async createNewUser(createUserDto) {
        return await this.userModel.create(createUserDto);
    }
    async getAllUsers() {
        return await this.userModel.find();
    }
    async getUserById(id) {
        return await this.userModel.findOne({ _id: id });
    }
    async updateUser(id, updateUserDto) {
        if (updateUserDto.email) {
            const isEmailExist = await this.userModel.findOne({ email: updateUserDto.email });
            if (isEmailExist) {
                throw new Error("email id is already in use");
            }
        }
        return await this.userModel.findByIdAndUpdate({ _id: id }, updateUserDto, {
            new: true
        });
    }
    async deleteUser(id) {
        return await this.userModel.findByIdAndDelete({ _id: id });
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("User")),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map