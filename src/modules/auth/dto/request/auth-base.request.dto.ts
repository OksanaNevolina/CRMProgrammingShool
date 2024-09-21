import {IsNotEmpty, IsString, Length, Matches} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class AuthBaseRequestDto {
    @ApiProperty({ example: 'test@gmail.com' })
    @IsString()
    @Length(0, 300)
    @Matches(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
    email: string;

    @ApiProperty({ example: '123qwe!@#QWE' })
    @IsString()
    @Length(0, 300)
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$_!%*#?&]{8,}$/)
    password: string;
}
