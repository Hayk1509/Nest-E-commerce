import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { GetSingleCategoryDto } from './dto/get-single-category.dto';
import { CreateCategoryDto } from './dto/creaete-category.dto';
import {
  GetCategoriesFilterDto,
  SortOrder,
} from './dto/get-categories-filter.dto';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('categories')
export class CategoriesController {
  constructor(private categoryService: CategoriesService) {}

  @Post()
  async createCategory(@Body() req: CreateCategoryDto) {
    return this.categoryService.create(req);
  }

  @Get()
  @ApiOperation({ summary: 'Retieve categories with filtering and sorting' })
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'Filter by category',
  })
  @ApiQuery({
    name: 'parentId',
    required: false,
    description: 'Filter by parentId',
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    description: 'Field sort by ',
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    description: 'Sort order (asc or desc)',
    enum: SortOrder,
  })
  async getAllCategories(@Query() filtersDto: GetCategoriesFilterDto) {
    return this.categoryService.getAll(filtersDto);
  }
  @Get(':id')
  async getCategory(@Param() param: GetSingleCategoryDto) {
    return this.categoryService.get(param.id);
  }

  @Delete(':id')
  async deleteCategory(@Param() param: GetSingleCategoryDto) {
    return this.categoryService.delete(param.id);
  }
  @Put(':id')
  async updateCategory(
    @Param() param: GetSingleCategoryDto,
    @Body() req: UpdateCategoryDto,
  ) {
    return this.categoryService.put(param, req);
  }
}
