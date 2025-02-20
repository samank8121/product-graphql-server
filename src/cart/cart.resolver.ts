import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Cart } from './models/cart.model';
import { ProductService } from 'src/product/product.service';
import { CartService } from './cart.service';
import { FindCartInput } from './dto/cart-input.dto';

@Resolver(() => Cart)
export class CartResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly cartService: CartService,
  ) {}
  @Query(() => [Cart], { name: 'carts' })
  async getProducts(
    @Args('params', { nullable: true }) params?: FindCartInput,
  ): Promise<Cart[] | void> {
    return await this.cartService.findAll(params ?? {});
  }
  @ResolveField(() => Cart)
  async productIds(@Parent() parent: Cart) {
    const productItems = await this.productService.findByCartId(parent.id);
    return productItems ?? [];
  }
}
