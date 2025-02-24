import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthInfo, LoginInput } from './dto/auth.dto';
import { CreateUserInput } from 'src/user/dto';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthInfo, { name: 'Login' })
  async login(@Args('params') params: LoginInput) {
    return this.authService.login(params);
  }

  @Mutation(() => AuthInfo, { name: 'Signup' })
  async signup(@Args('params') dto: CreateUserInput) {
    return this.authService.signin(dto);
  }
}
