import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class GetUserDto {
  @ApiProperty({ example: 'MyEmail@ggmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'strongPassword' })
  @IsNotEmpty()
  @IsString()
  @Length(6, 20)
  password: string;
}
