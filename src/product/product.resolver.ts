import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './models/product.model';
import { CreateProductInput, FindProductInput, UpdateProductInput } from './dto/product-input.dto';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [Product], { name: 'products' })
  async getProducts(
    @Args('params', { nullable: true }) params?: FindProductInput,
  ): Promise<Product[] | void> {
    return await this.productService.findAll(params ?? {});
  }

  @Query(() => Product, { name: 'product' })
  async getProduct(
    @Args('params') { slug }: FindProductInput,
  ): Promise<Product | void> {
    return await this.productService.findBySlug(slug);
  }

  @Mutation(() => Product, { name: 'CreateProduct' })
  async createProduct(
    @Args('params') params: CreateProductInput,
  ): Promise<Product> {
    return await this.productService.create(params);
  }
  @Mutation(() => Product, { name: 'UpdateProduct' })
  async updateProduct(
    @Args('params') product: UpdateProductInput,
  ) {
    return this.productService.updateProduct(product);
  }
  @Mutation(() => Boolean, { name: 'DeleteProduct' })
  async deleteAuthor(@Args('slug') slug: string) {
    return this.productService.delete(slug);
  }
}
