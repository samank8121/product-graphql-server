import { Field, InputType, Int, OmitType, PartialType } from '@nestjs/graphql';
import { User } from './user.dto';
import { IsEmail, IsInt, IsString, IsStrongPassword } from 'class-validator';

@InputType()
export class FindUserInput extends PartialType(
  OmitType(User, ['createdAt', 'updatedAt'] as const)
) {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field({ nullable: true })
  username?: string;
  
  @Field({ nullable: true })
  email?: string;
}
@InputType()
export class CreateUserInput {    
  @Field()
  @IsString()
  username: string;  

  @Field()
  @IsEmail()
  email: string;
  
  @Field()
  @IsStrongPassword()
  password: string;
}
@InputType()
export class UpdateUserInput {   
  @Field(() => Int)
  @IsInt()
  id: number; 

  @Field()
  @IsString()
  username: string;  

  @Field()
  @IsStrongPassword()
  password: string;
}