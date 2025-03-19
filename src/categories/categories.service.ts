import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/creaete-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { GetSingleCategoryDto } from './dto/get-single-category.dto';
import {
  GetCategoriesFilterDto,
  SortOrder,
} from './dto/get-categories-filter.dto';

@Injectable()
export class CategoriesService {
  constructor(private prismaService: PrismaService) {}
  async create(category: CreateCategoryDto) {
    return await this.prismaService.category.create({
      data: {
        name: category.name,
      },
    });
  }
  async getAll(filterDto?: GetCategoriesFilterDto) {
    const { name, parentId, sortBy, sortOrder } = filterDto || {};
    const where: any = {};
    if (name) {
      where.name = { contains: name, mode: 'insensitive' };
    }
    if (parentId !== undefined) {
      where.parentId = parentId;
    }
    let orderBy = {} as { [x: string]: SortOrder };
    if (sortBy) {
      orderBy = { [sortBy]: sortOrder || SortOrder.ASC };
    }
    return await this.prismaService.category.findMany({ where, orderBy });
  }
  async get(id: number) {
    return await this.prismaService.category.findUnique({
      where: {
        id: id,
      },
    });
  }
  async delete(id: number) {
    return await this.prismaService.category.delete({
      where: {
        id: id,
      },
    });
  }
  async put(param: GetSingleCategoryDto, category: UpdateCategoryDto) {
    return await this.prismaService.category.update({
      where: { id: param.id },
      data: {
        name: category.name,
        parentId: category.parentId,
      },
    });
  }
}
