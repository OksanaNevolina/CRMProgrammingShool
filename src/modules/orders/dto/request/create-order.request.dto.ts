import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  Min, ValidateNested,
} from 'class-validator';
import { TransformHelper } from '../../../../common/helpers/transform.helper';
import {CommentDto} from "./create-comment.request.dto";

export class CreateOrderRequestDto {
  @ApiProperty({ example: 'Anna' })
  @IsOptional()
  @IsString()
  @Length(1, 25)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  name?: string;

  @ApiProperty({ example: 'Chorna' })
  @IsOptional()
  @IsString()
  @Length(1, 25)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  surname?: string;

  @ApiProperty({ example: 'test@gmail.com' })
  @IsString()
  @Length(0, 300)
  @Matches(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
  email: string;

  @ApiProperty({ example: '0971112233' })
  @IsOptional()
  @Matches(/^\+?\d{7,12}$/, {
    message: 'Phone number must be between 7 and 12 digits',
  })
  phone?: string;

  @ApiProperty({ example: '32' })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(120)
  age?: number;

  @IsOptional()
  @IsString()
  @Length(1, 10)
  course?: string;

  @IsOptional()
  @IsString()
  @IsIn(['full-time', 'part-time', 'online'])
  course_format?: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  course_type?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  sum?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  alreadyPaid?: number;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  utm?: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  msg?: string;

  @IsOptional()
  @IsString()
  @IsIn(['pending', 'paid', 'canceled'])
  status?: string;

  @IsString()
  @IsOptional()
  manager: string;

  @IsString()
  @IsOptional()
  group: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CommentDto)
  @IsOptional()
  comments?: CommentDto[];
}
