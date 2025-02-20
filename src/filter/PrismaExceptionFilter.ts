import {
  Catch,
  ArgumentsHost,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements GqlExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = GqlArgumentsHost.create(host);
    const info = ctx.getInfo();
    const error = {
        message: this.getReadableMessage(exception),
        code: exception.code,
        meta: exception.meta,
        path: info.path.key,
        operation: info.operation.operation,
        statusCode: 400
      };
      throw new GraphQLError(error.message, {
        extensions: {
          code: error.code,
          meta: error.meta,
          path: error.path,
          operation: error.operation,
          statusCode: error.statusCode,
        },
        path: info.path.typename ? [info.path.typename, info.path.key] : [info.path.key]
      });
  }
  

  private getReadableMessage(
    exception: Prisma.PrismaClientKnownRequestError,
  ): string {
    switch (exception.code) {
      case 'P2002':
        const field = (exception.meta?.target as string[])?.join(', ');
        return `A record with this ${field} already exists.`;
      case 'P2025':
        return 'Record not found.';
      case 'P2003':
        return 'Foreign key constraint failed.';
      case 'P2014':
        return 'The change you are trying to make would violate the required relation.';
      default:
        return exception.message;
    }
  }
}
