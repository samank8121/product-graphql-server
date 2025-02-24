import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { UserCartService } from 'src/user-cart/user-cart.service';

@Module({
  providers: [UserResolver, UserService, UserCartService],
  exports: [UserService],
})
export class UserModule {}
