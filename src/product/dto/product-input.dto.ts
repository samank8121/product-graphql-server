import { Field, Float, InputType, Int, OmitType, PartialType } from '@nestjs/graphql';
import { Product } from './product.dto';
import { IsInt, IsOptional, IsString } from 'class-validator';

@InputType()
export class FindProductInput extends PartialType(
  OmitType(Product, ['createdAt', 'updatedAt'] as const)
) {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field({ nullable: true })
  caption?: string;

  @Field(() => Float, { nullable: true })
  price?: number;

  @Field({ nullable: true })
  slug?: string;

  @Field({ nullable: true })
  weight?: string;

  @Field(() => Int, { nullable: true })
  rate?: number;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  imageSrc?: string;
}

@InputType()
export class CreateProductInput {    
  @Field()
  @IsString()
  caption: string;

  @Field(() => Float, )
  @IsInt()
  price: number;

  @Field()
  @IsString()
  slug: string;

  @Field()
  @IsString()
  weight: string;

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  @IsOptional()
  @IsInt()
  rate: number = 0;

  @Field()
  @IsString()
  description: string;

  @Field()
  @IsString()
  imageSrc: string;
}
@InputType()
export class UpdateProductInput {    
  @Field({ nullable: true })
  @IsString()
  caption: string;

  @Field(() => Float,{ nullable: true } )
  @IsInt()
  price: number;

  @Field()
  @IsString()
  slug: string;

  @Field({ nullable: true })
  @IsString()
  weight: string;

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  @IsOptional()
  @IsInt()
  rate: number = 0;

  @Field({ nullable: true })
  @IsString()
  description: string;

  @Field({ nullable: true })
  @IsString()
  imageSrc: string;
}

@InputType()
export class ProductIdCountInput {
  @Field(() => Int)
  productId: number;
  @Field(() => Int)
  count: number;
}
