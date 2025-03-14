import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}
  async create(userData: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = this.prismaService.user.create({
      data: {
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        password: hashedPassword,
      },
    });
    return user;
  }
  async getUser(userData: GetUserDto) {
    const user = this.prismaService.user.findUnique({
      where: {
        email: userData.email,
        password: userData.email,
      },
      select: {
        email: true,
        firstName: true,
        lastName: true,
      },
    });
    return user;
  }
  async findByEmail(email: string) {
    return await this.prismaService.user.findUnique({
      where: { email },
    });
  }
}
