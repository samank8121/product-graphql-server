import { forwardRef, Module } from '@nestjs/common';
import { CartResolver } from './cart.resolver';
import { CartService } from './cart.service';
import { UserModule } from 'src/user/user.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [UserModule, forwardRef(() => ProductModule)],
  providers: [CartResolver, CartService],
  exports: [CartService],
})
export class CartModule {}
