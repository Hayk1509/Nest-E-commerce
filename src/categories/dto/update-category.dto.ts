import { PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './creaete-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
