import { Field, InputType, Int, OmitType, PartialType } from '@nestjs/graphql';
import { Cart } from '../models/cart.model';

@InputType()
export class FindCartInput extends PartialType(
  OmitType(Cart, ['createdAt', 'updatedAt'] as const)
) {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Int, { nullable: true })
  userId?: number; 
}
