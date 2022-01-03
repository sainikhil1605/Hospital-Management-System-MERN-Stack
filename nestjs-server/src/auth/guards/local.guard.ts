import { HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class LocalGuard extends AuthGuard('local') {
  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new HttpException(info.message, HttpStatus.BAD_REQUEST);
    }
    return user;
  }
}
