import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Cart } from 'src/cart/dto/cart.dto';

@ObjectType()
export class Product {
  @Field(() => Int)
  id: number;

  @Field()
  caption: string;

  @Field(() => Float)
  price: number;

  @Field()
  slug: string;

  @Field()
  weight: string;

  @Field(() => Int)
  rate: number;

  @Field()
  description: string;

  @Field()
  imageSrc: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => [Cart], { nullable: true })
  cartIds?: Cart[];
}
