import { IsString, MaxLength, MinLength, IsNotEmpty, IsEmail, IsInt, Min, Max } from "class-validator"

export class CreateUserDto {
    @IsString()
    @MaxLength(25)
    @MinLength(2)
    @IsNotEmpty()
    readonly firstName: string

    @IsString()
    @MaxLength(25)
    @MinLength(2)
    @IsNotEmpty()
    readonly lastName: string

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    readonly email: string

    @IsInt()
    @Min(1)
    @Max(100)
    @IsNotEmpty()
    readonly age: number
}