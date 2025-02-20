import { forwardRef, Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { CartModule } from 'src/cart/cart.module';

@Module({
  imports: [forwardRef(() => CartModule)],
  providers: [ProductService, ProductResolver],
  exports: [ProductService],
})
export class ProductModule {}
