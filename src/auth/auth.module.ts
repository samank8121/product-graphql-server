import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UserCartModule } from 'src/user-cart/user-cart.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports:[JwtModule.register({}), UserCartModule],
  providers: [AuthResolver, AuthService, JwtStrategy]
})
export class AuthModule {}
