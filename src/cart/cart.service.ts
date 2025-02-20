import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { FindCartInput } from './dto/cart-input.dto';

@Injectable()
export class CartService { 
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
