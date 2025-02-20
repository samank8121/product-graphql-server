import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import {
  CreateProductInput,
  FindProductInput,
  UpdateProductInput,
} from './dto/product-input.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(params?: FindProductInput) {
    const products = await this.prismaService.product.findMany({
      where: { ...params },
    });
    if (!products.length) {
      throw new NotFoundException('No products found');
    }
    return products;
  }

  async findBySlug(slug: string) {
    const product = await this.prismaService.product.findUnique({
      where: {
        slug: slug,
      },
    });
    if (!product.id) {
      throw new NotFoundException('Product details not found');
    }
    return product;
  }

  async create(params: CreateProductInput) {
    const product = await this.prismaService.product.create({
      data: { ...params },
    });
    if (!product.id) {
      throw new HttpException('Failed to create author', 417);
    }
    return product;
  }

  async updateProduct(product: UpdateProductInput) {
    const response = await this.prismaService.product.update({
      where: { slug: product.slug },
      data: { ...product },
    });
    return response;
  }

  async delete(slug: string) {
    const product = await this.prismaService.product.delete({
      where: { slug: slug },
    });

    return product.slug === slug;
  }

  async findByCartId(cartId: number) {
    const products = await this.prismaService.product.findMany({
      where: {
        cart_product: { some: { cartId } },
      },
    });
    if (!products.length) {
      return null;
    }
    return products;
  }
}
