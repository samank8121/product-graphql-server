import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Cart } from './models/cart.model';
import { ProductService } from 'src/product/product.service';
import { CartService } from './cart.service';
import {
  CreateCartInput,
  FindCartInput,
  UpdateCartInput,
} from './dto/cart-input.dto';

@Resolver(() => Cart)
export class CartResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly cartService: CartService,
  ) {}
  @Query(() => [Cart], { name: 'carts' })
  async getCarts(
    @Args('params', { nullable: true }) params?: FindCartInput,
  ): Promise<Cart[] | void> {
    return await this.cartService.findAll(params ?? {});
  }
  @Mutation(() => Cart, { name: 'CreateProduct' })
  async createCart(@Args('params') params: CreateCartInput): Promise<Cart> {
    return await this.cartService.create(params);
  }
  @Mutation(() => Cart, { name: 'UpdateProduct' })
  async updateCart(@Args('params') cart: UpdateCartInput) {
    return this.cartService.update(cart);
  }
  @Mutation(() => Boolean, { name: 'DeleteProduct' })
  async deleteCart(@Args('id') id: number) {
    return this.cartService.remove(id);
  }
  @ResolveField(() => Cart)
  async productIds(@Parent() parent: Cart) {
    const productItems = await this.productService.findByCartId(parent.id);
    return productItems ?? [];
  }
}
