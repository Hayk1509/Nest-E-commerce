import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
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
    try {
      // Ստուգում, թե կատեգորիան արդեն գոյություն ունի
      const existingCategory = await this.prismaService.category.findUnique({
        where: { name: category.name },
      });

      if (existingCategory) {
        throw new ConflictException(
          `Կատեգորիա ${category.name} արդեն գոյություն ունի`,
        );
      }

      return await this.prismaService.category.create({
        data: category,
      });
    } catch (error) {
      // Եթե ստացվում է այլ ներքին սխալ
      if (error.code === 'P2002') {
        // Հավանաբար հնարավոր է, որ կրկնակի գներ դեռևս չհաստատված են նախորդ ստուգումից
        throw new ConflictException(
          `Կատեգորիա ${category.name} արդեն գոյություն ունի`,
        );
      }
      throw new InternalServerErrorException('Ներքին խնդիր է առաջացել');
    }
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
