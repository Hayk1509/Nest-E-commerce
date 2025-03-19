import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetSingleCategoryDto {
  @ApiProperty({ description: 'Category ID', example: '1' })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  id: number;
}
