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
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userCartservice: UserCartService,
  ) {}
  async signin(dto: CreateUserInput) {
    const user = await this.userCartservice.create(dto);
    const token = jwt.sign(
      { userId: user.id },
      process.env.TOKEN_SECRET_KEY as jwt.Secret,
    );

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
    const token = jwt.sign(
      { userId: user.id },
      process.env.TOKEN_SECRET_KEY as jwt.Secret,
    );

    return {
      token,
      user: {
        username: user.username,
        email: user.email,
      },
    };
  }
}
