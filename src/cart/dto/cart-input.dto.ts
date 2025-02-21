import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@InputType()
export class FindCartInput  {
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