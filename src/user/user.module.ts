import { forwardRef, Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { UserCartModule } from 'src/user-cart/user-cart.module';

@Module({
  imports: [forwardRef(() => UserCartModule)],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
