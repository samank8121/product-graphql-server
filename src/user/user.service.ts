import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ICrudService } from 'src/common/interfaces/crud-service.interface';
import { User } from './dto/user.dto';
import {
  CreateUserInput,
  FindUserInput,
  UpdateUserInput,
} from './dto/user-input.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UserCartService } from 'src/user-cart/user-cart.service';


@Injectable()
export class UserService
  implements
    ICrudService<User, FindUserInput, CreateUserInput, UpdateUserInput, number>
{
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userCartService: UserCartService,
  ) {}

  async findAll(params?: FindUserInput): Promise<User[]> {
    const users = await this.prismaService.user.findMany({
      where: { ...params },
    });
    if (!users.length) {
      throw new NotFoundException('No users found');
    }
    return users;
  }
  async create(dto: CreateUserInput): Promise<User> {
    return this.userCartService.create(dto);
  }
  async update(dto: UpdateUserInput): Promise<User> {
    const { id } = dto;
    const user = await this.prismaService.user.update({
      where: { id },
      data: { ...dto },
    });
    return user;
  }
  async remove(id: number): Promise<boolean> {
    const user = await this.prismaService.user.delete({
      where: { id: id },
    });

    return user.id === id;
  }
  async findByCartId(cartId: number) {
    const { user } = await this.prismaService.cart.findUnique({
      where: { id: cartId },
      select: { user: true },
    });

    return user;
  }
}
