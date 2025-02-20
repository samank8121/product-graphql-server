import { forwardRef, Module } from '@nestjs/common';
import { CartResolver } from './cart.resolver';
import { CartService } from './cart.service';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [forwardRef(() => ProductModule)],
  providers: [CartResolver, CartService],
  exports: [CartService],
})
export class CartModule {}
