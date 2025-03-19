import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Car' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: '2022 Grand Turism' })
  @IsString()
  description: string;

  @ApiProperty({
    examples: [1, 2, 4.99],
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  sellerId: number;
}
