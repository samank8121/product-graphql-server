import { Injectable } from '@nestjs/common';
import { ICrudService } from 'src/common/interfaces/crud-service.interface';
import { User } from './dto/user.dto';
import { CreateUserInput, FindUserInput, UpdateUserInput } from './dto/user-input.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class UserService
  implements
    ICrudService<User, FindUserInput, CreateUserInput, UpdateUserInput, number>
{
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(dto: FindUserInput): Promise<User[]> {
    console.log(dto);
    throw new Error('Method not implemented.');
  }
  async create(dto: CreateUserInput): Promise<User> {
    console.log(dto);
    throw new Error('Method not implemented.');
  }
  async update(dto: UpdateUserInput): Promise<User> {
    console.log(dto);
    throw new Error('Method not implemented.');
  }
  async remove(dto: number): Promise<boolean> {
    console.log(dto);
    throw new Error('Method not implemented.');
  }
  async findByCartId(cartId: number) {
    const { user } = await this.prismaService.cart.findUnique({
      where: { id: cartId },
      select: { user: true },
    });

    return user;
  }
}
