import { Field, InputType, ObjectType, OmitType } from "@nestjs/graphql";
import { IsEmail } from "class-validator";
import { User } from "src/user/dto";

@ObjectType()
export class AuthUserInfo extends OmitType(User, ['id', 'password', 'createdAt', 'updatedAt'] as const) {}

@ObjectType()
export class AuthInfo {    
  @Field()
  token: string;
  
  @Field(() => AuthUserInfo)
  user?: AuthUserInfo;
}

@InputType()
export class LoginInput {    
  @Field()
  @IsEmail()
  email: string;
  
  @Field()
  password: string;
}

