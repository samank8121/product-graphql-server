import { Field, InputType, Int, OmitType, PartialType } from '@nestjs/graphql';
import { Cart } from './cart.dto';
import { IsInt } from 'class-validator';

@InputType()
export class FindCartInput extends PartialType(
  OmitType(Cart, ['createdAt', 'updatedAt'] as const)
) {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Int, { nullable: true })
  userId?: number; 
}
@InputType()
export class CreateCartInput {    
  @Field(() => Int)
  @IsInt()
  userId: number;  
}
@InputType()
export class UpdateCartInput {   
  @Field(() => Int)
  @IsInt()
  id: number; 

  @Field({ nullable: true })
  @IsInt()
  userId: number;  
}