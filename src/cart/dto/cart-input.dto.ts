import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt } from 'class-validator';
import { ProductIdCountInput } from 'src/product/dto';


@InputType()
export class FindCartInput  {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Int, { nullable: true })
  userId?: number; 
}

export class CreateCartInput {  
  @IsInt()
  userId: number;  
}
@InputType()
export class UpdateCartInput {   
  @Field(() => Int)
  @IsInt()
  id: number; 

  @Field(() => [ProductIdCountInput], { nullable: true })
  products: ProductIdCountInput[]
}