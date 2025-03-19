import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetProductsFilterDto, SortOrder } from './dto/get-products-filter.dto';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}
  async createProduct(product: CreateProductDto) {
    return await this.prismaService.product.create({
      data: product,
    });
  }
  async getAll(filter: GetProductsFilterDto) {
    const { categoryId, name, sortBy, sortOrder } = filter || {};
    const where: any = {};
    if (name) {
      where.name = { contains: name, mode: 'insensitive' };
    }
    if (categoryId && categoryId.length) {
      where.categoryId = { in: categoryId };
    }
    let orderBy = {} as { [x: string]: SortOrder };
    if (sortBy) {
      orderBy = { [sortBy]: sortOrder || SortOrder.ASC };
    }
    return await this.prismaService.product.findMany({ where, orderBy });
  }
}
