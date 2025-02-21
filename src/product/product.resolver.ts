import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product, CreateProductInput, FindProductInput, UpdateProductInput } from './dto';
import { CartService } from 'src/cart/cart.service';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService,
    private readonly cartService: CartService,
  ) {}

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
    return this.productService.update(product);
  }
  @Mutation(() => Boolean, { name: 'DeleteProduct' })
  async deleteProduct(@Args('slug') slug: string) {
    return this.productService.remove(slug);
  }
  @ResolveField(() => Product)
  async cartIds(@Parent() parent: Product) {
    const cartItems = await this.cartService.findByProductId(parent.id);
    return cartItems ?? [];
  }
}
