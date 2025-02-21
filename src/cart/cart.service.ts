import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import {
  Cart,
  CreateCartInput,
  FindCartInput,
  UpdateCartInput,
} from './dto';
import { ICrudService } from 'src/common/interfaces/crud-service.interface';

@Injectable()
export class CartService
  implements
    ICrudService<Cart, FindCartInput, CreateCartInput, UpdateCartInput, number>
{
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(params?: FindCartInput) {
    const carts = await this.prismaService.cart.findMany({
      where: { ...params },
    });
    if (!carts.length) {
      throw new NotFoundException('No products found');
    }
    return carts;
  }
  async create(params: CreateCartInput) {
    const cart = await this.prismaService.cart.create({
      data: { ...params },
    });
    if (!cart.id) {
      throw new HttpException('Failed to create author', 417);
    }
    return cart;
  }
  async update(cart: UpdateCartInput) {
    const response = await this.prismaService.cart.update({
      where: { id: cart.id },
      data: { ...cart },
    });
    return response;
  }
  async remove(id: number) {
    const cart = await this.prismaService.cart.delete({
      where: { id },
    });

    return cart.id === id;
  }
  async findByProductId(productId: number) {
    const carts = await this.prismaService.cart.findMany({
      where: {
        cart_product: { some: { productId } },
      },
    });

    if (!carts.length) {
      return null;
    }
    return carts;
  }
}
