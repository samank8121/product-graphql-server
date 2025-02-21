import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateUserInput } from 'src/user/dto';
import * as argon2 from 'argon2';

@Injectable()
export class UserCartService {
  constructor(private readonly prismaService: PrismaService) {}
  
  async create(dto: CreateUserInput) {
    const { username, email, password } = dto;
    const duplicateUser = await this.prismaService.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });
    if (duplicateUser) {
      throw new HttpException('Duplicate user', HttpStatus.CONFLICT);
    }
    const hashedPassword = await argon2.hash(password);
    const result = await this.prismaService.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data: { username: username, password: hashedPassword, email },
      });

      await prisma.cart.create({
        data: { userId: user.id },
      });
      return user;
    });
    return result;
  }
}
