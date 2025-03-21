import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { AdminModule } from './admin/admin.module';
import { PrismaModule } from './prisma/prisma.module';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UsersModule,
    ProductsModule,
    CategoriesModule,
    AdminModule,
    ArticleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
