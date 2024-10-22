import {
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { CourseEnum } from '../../enums/course.enum';
import { CourseTypeEnum } from '../../enums/course-type.enum';
import { CourseFormatEnum } from '../../enums/course-format.enum';
import { StatusEnum } from '../../enums/status.enum';


export class UpdateOrderDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  surname?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  age?: number;

  @IsOptional()
  @IsEnum(StatusEnum)
  status?: StatusEnum;

  @IsOptional()
  @IsEnum(CourseEnum)
  course?: CourseEnum;

  @IsOptional()
  @IsEnum(CourseTypeEnum)
  course_type?: CourseTypeEnum;

  @IsOptional()
  @IsEnum(CourseFormatEnum)
  course_format?: CourseFormatEnum;

  @IsInt({ message: 'Sum must be an integer number' })
  @Min(0, { message: 'Sum must not be less than 0' })
  sum: number;

  @IsInt({ message: 'AlreadyPaid must be an integer number' })
  @Min(0, { message: 'AlreadyPaid must not be less than 0' })
  alreadyPaid: number;

  @IsOptional()
  groupId?: number;
}
