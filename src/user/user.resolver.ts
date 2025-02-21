import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput, FindUserInput, UpdateUserInput, User } from './dto';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'users' })
  async getUsers(
    @Args('params', { nullable: true }) params?: FindUserInput,
  ): Promise<User[] | void> {
    return await this.userService.findAll(params ?? {});
  }

  @Mutation(() => User, { name: 'CreateUser' })
  async createUser(@Args('params') params: CreateUserInput): Promise<User> {
    return await this.userService.create(params);
  }
  @Mutation(() => User, { name: 'UpdateUser' })
  async updateUser(@Args('params') user: UpdateUserInput) {
    return this.userService.update(user);
  }
  @Mutation(() => Boolean, { name: 'DeleteProduct' })
  async deleteUser(@Args('id') id: number) {
    return this.userService.remove(id);
  }
}
