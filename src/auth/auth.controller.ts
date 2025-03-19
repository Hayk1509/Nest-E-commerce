// src/auth/auth.controller.ts
import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
  UnauthorizedException,
  BadRequestException,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { GetUserDto } from 'src/users/dto/get-user.dto';
import { Roles, RolesGuard } from 'src/common/guards/roles.guard';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
@UseGuards(RolesGuard)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register-admin')
  @ApiOperation({ summary: 'Register an admin user' })
  async registerAdmin(@Body() createUserDto: CreateUserDto) {
    if (createUserDto.role && createUserDto.role !== 'ADMIN') {
      throw new BadRequestException(
        'Օգտագործողի դերը պետք է լինի ADMIN այս endpoint-ի համար',
      );
    }
    const adminData = {
      ...createUserDto,
      role: Role.ADMIN,
    };
    return await this.authService.registerAdmin(adminData);
  }

  @Post('set-manager/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Set a user as manager (only ADMIN allowed)' })
  async setManager(@Param('id') id: number) {
    return await this.authService.setUserRole(id, 'MANAGER');
  }
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() req: GetUserDto) {
    return this.authService.login(req);
  }

  @Post('refresh')
  async refresh(@Body('refresh_token') refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not provided');
    }
    return this.authService.refreshToken(refreshToken);
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {
    // This route initiates the Google OAuth flow
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Request() req) {
    return this.authService.googleLogin(req);
  }
}
