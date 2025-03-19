import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { GetProductsFilterDto, SortOrder } from './dto/get-products-filter.dto';
import { ParseIntArrayPipe } from 'src/common/pipes/parse-int-array.pipe';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';

@Controller('products')
@ApiTags('Product')
@UseFilters(HttpExceptionFilter)
export class ProductsController {
  constructor(private productService: ProductsService) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new product' })
  async create(@Body() product: CreateProductDto) {
    return await this.productService.createProduct(product);
  }

  @Get()
  @ApiOperation({ summary: 'Retive products with filtering and sorting' })
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'Filter by product name',
  })
  @ApiQuery({
    name: 'categoryId',
    required: false,
    description: 'Filter by categoryIds',
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    description: 'Fields sort by',
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    description: 'Sort order (asc or desc)',
    enum: SortOrder,
  })
  async getAll(
    @Query('categoryId', ParseIntArrayPipe) categoryId: number[],
    @Query() filterDto: Omit<GetProductsFilterDto, 'categoryId'>,
  ) {
    const fullFilterDto: GetProductsFilterDto = {
      ...filterDto,
      categoryId,
    };
    return await this.productService.getAll(fullFilterDto);
  }
}
