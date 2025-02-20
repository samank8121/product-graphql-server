import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ProductModule } from './product/product.module';
import { CommonModule } from './common/common.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: false,
      includeStacktraceInErrorResponses: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    ProductModule,
    CommonModule,
    CartModule,
  ],
})
export class AppModule {}
