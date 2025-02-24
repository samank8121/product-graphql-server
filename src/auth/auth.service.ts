import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UserCartService } from 'src/user-cart/user-cart.service';
import { CreateUserInput } from 'src/user/dto';
import { LoginInput } from './dto/auth.dto';
import * as argon2 from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userCartservice: UserCartService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signin(dto: CreateUserInput) {
    const user = await this.userCartservice.create(dto);
    const token = await this.signToken(user.id, dto.email);

    return {
      token,
      user: {
        username: user.username,
        email: user.email,
      },
    };
  }
  async login(dto: LoginInput) {
    const { email, password } = dto;
    const user = await this.prismaService.user.findFirst({ where: { email } });
    if (!user) {
      throw new NotFoundException('No user found');
    }
    const isValid = await argon2.verify(user.password, password);
    if (!isValid) {
      throw new HttpException('Password not correct', HttpStatus.UNAUTHORIZED);
    }
    const token = await this.signToken(user.id, email);

    return {
      token,
      user: {
        username: user.username,
        email: user.email,
      },
    };
  }
  async signToken(
    userId: number,
    email: string
  ): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('TOKEN_SECRET_KEY');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '45m',
      secret: secret,
    });

    return token;
  }
}
