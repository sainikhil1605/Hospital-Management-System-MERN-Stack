import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const status = exception.code === 11000 ? 409 : 500;
    const message =
      exception.code === 11000
        ? 'User Already Exists'
        : 'Internal Server Error';
    const response = host.switchToHttp().getResponse();
    response.status(status).json({
      statusCode: status,
      error: message,
      message: exception.message,
    });
  }
}
