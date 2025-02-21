import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Cart, CreateCartInput, FindCartInput, UpdateCartInput } from './dto';
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
      throw new NotFoundException('No cart found');
    }
    return carts;
  }
  async create(params: CreateCartInput) {
    const cart = await this.prismaService.cart.create({
      data: { ...params },
    });
    if (!cart.id) {
      throw new HttpException(
        'Failed to create cart',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
    return cart;
  }
  async update(cartInput: UpdateCartInput) {
    const { id: cartId, products } = cartInput;
    const transaction = products.map((p) => {
      return this.prismaService.cartProduct.upsert({
        where: {
          cartId_productId: { cartId: cartId, productId: p.productId },
        },
        update: {
          productCount: p.count,
        },
        create: {
          cartId: cartId,
          productId: p.productId,
          productCount: p.count,
        },
      });
    });

    await this.prismaService.$transaction(transaction);
    const updatedCart = await this.prismaService.cart.findUnique({
      where: { id: cartId },
      include: { cart_product: true },
    });

    if (!updatedCart) {
      throw new Error('Cart not found');
    }

    return updatedCart;
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
  async findItemCountByCartId(id: number) {
    const cart = await this.prismaService.cartProduct.findFirst({
      where: {
        cartId: id,
      },
    });
    return cart ? cart.productCount : 0;
  }
}
