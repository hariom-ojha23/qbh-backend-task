import { IsNotEmpty, IsString, IsEmail, MaxLength, MinLength, } from "class-validator";

export class CreateUserDto {
    @IsString()
    @MaxLength(30)
    @MinLength(2)
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @MinLength(2)
    @MaxLength(30)
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;


}