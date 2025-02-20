import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/product/models/product.model';

@ObjectType()
export class Cart {
  @Field(() => Int)
  id: number;

  @Field()
  userId: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => [Product])
  productIds?: Product[];
}
