import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductWithCount } from 'src/product/dto';
import { User } from 'src/user/dto';

@ObjectType()
export class Cart {
  @Field(() => Int)
  id: number;

  @Field(() => User)
  user?: User;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => [ProductWithCount])
  products?: ProductWithCount[];
}
