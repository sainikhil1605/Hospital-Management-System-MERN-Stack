import { HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class JwtGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new HttpException(info.message, HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
