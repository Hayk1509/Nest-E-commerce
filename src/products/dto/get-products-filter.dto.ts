import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}
export class GetProductsFilterDto {
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description:
      'Filter products by one or more category IDs (comma-separated)',
    type: [Number],
    example: '1,2,3',
  })
  @IsOptional()
  @IsArray()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.split(',').map((id: string) => parseInt(id.trimEnd(), 10));
    }
    return value;
  })
  @IsInt({ each: true })
  categoryId: number[];

  @ApiPropertyOptional({
    description: 'Field to sort by (e.g., price, name)',
    example: 'price',
  })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiPropertyOptional({
    description: 'Sort order',
    enum: SortOrder,
    example: SortOrder.ASC,
  })
  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder;
}
