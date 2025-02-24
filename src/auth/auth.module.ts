import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UserCartModule } from 'src/user-cart/user-cart.module';

@Module({
  imports:[UserCartModule],
  providers: [AuthResolver, AuthService]
})
export class AuthModule {}
