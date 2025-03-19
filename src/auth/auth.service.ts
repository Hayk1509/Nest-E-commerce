import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Role, User } from '@prisma/client';
import { GetUserDto } from 'src/users/dto/get-user.dto';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: GetUserDto) {
    const payload = { email: user.email, sub: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return this.login(user);
  }
  async registerAdmin(createUserDto: CreateUserDto) {
    const existingAdmin = await this.usersService.findOneByRole('ADMIN');
    if (existingAdmin) {
      throw new ConflictException('Ադմին գրանցված է արդեն');
    }
    return await this.usersService.create({ ...createUserDto, role: 'ADMIN' });
  }
  async setUserRole(userId: number, role: Role) {
    return await this.usersService.updateRole(userId, role);
  }
  async googleLogin(req: { user: User }) {
    if (!req.user) {
      throw new UnauthorizedException();
    }
    return this.login(req.user);
  }
  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: 'YOUR_REFRESH_SECRET',
      });
      const newPayload = { email: payload.email, sub: payload.sub };
      const access_token = this.jwtService.sign(newPayload, {
        expiresIn: '15m',
      });
      const new_refresh_token = this.jwtService.sign(newPayload, {
        expiresIn: '7d',
        secret: 'YOUR_REFRESH_SECRET',
      });
      return { access_token, refresh_token: new_refresh_token };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
