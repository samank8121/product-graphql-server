import { forwardRef, Module } from '@nestjs/common';
import { CartResolver } from './cart.resolver';
import { CartService } from './cart.service';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [forwardRef(() => ProductModule), forwardRef(() => UserModule)],
  providers: [CartResolver, CartService],
  exports: [CartService],
})
export class CartModule {}
