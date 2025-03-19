import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Category 1' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({example: 'Id of parent catgory'})
  @IsNumber()
  parentId: number;
}
