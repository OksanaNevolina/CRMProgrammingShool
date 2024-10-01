import {IsDate, IsNotEmpty, IsString} from "class-validator";

export class CommentDto {
    @IsString()
    @IsNotEmpty()
    user: string;

    @IsString()
    @IsNotEmpty()
    comment: string;

    @IsDate()
    @IsNotEmpty()
    date: Date;
}