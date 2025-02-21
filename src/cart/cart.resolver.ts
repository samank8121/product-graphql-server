import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { ProductService } from 'src/product/product.service';
import { CartService } from './cart.service';
import { Cart, CreateCartInput, FindCartInput, UpdateCartInput } from './dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/dto';
import { ProductWithCount } from 'src/product/dto';

@Resolver(() => Cart)
export class CartResolver {
  constructor(
    private readonly cartService: CartService,
    private readonly productService: ProductService,
    private readonly userService: UserService,    
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
  @ResolveField(() => [ProductWithCount ])
  async products(@Parent() parent: Cart) {
    const productItems = await this.productService.findByCartId(parent.id);
    return productItems ?? [];
  }
  @ResolveField(() => User)
  async user(@Parent() parent: Cart) {
    const userItem = await this.userService.findByCartId(parent.id);
    return userItem ?? null;
  }  
}
