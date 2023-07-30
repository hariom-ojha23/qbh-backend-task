import { IsString, MaxLength, MinLength, IsOptional, IsEmail, IsInt, Min, Max } from "class-validator"

export class UpdateUserDto {
    @IsString()
    @MaxLength(25)
    @MinLength(2)
    @IsOptional()
    readonly firstName: string

    @IsString()
    @MaxLength(25)
    @MinLength(2)
    @IsOptional()
    readonly lastName: string

    @IsString()
    @IsEmail()
    @IsOptional()
    readonly email: string

    @IsInt()
    @Min(1)
    @Max(100)
    @IsOptional()
    readonly age: number
}