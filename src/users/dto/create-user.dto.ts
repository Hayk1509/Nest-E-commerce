import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example1.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'strongPassword' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiPropertyOptional({
    enum: Role,
    default: Role.USER,
    description: 'User role',
  })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
