import {
  Body,
  Controller,
  Post,
  Request,
  UnauthorizedException,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { AuthDto } from './auth/dto/auth.dto';
import { SignUpDto } from './auth/dto/signup.dto';
import { LocalGuard } from './auth/guards/local.guard';
import { MongoExceptionFilter } from './user/filters/mongo.filter';
import { UserService } from './user/user.service';

@Controller('/api/v1/auth')
@ApiTags('auth')
export class AppController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('/login')
  @ApiBody({ type: AuthDto })
  @UseGuards(LocalGuard)
  login(@Request() req) {
    return this.authService.generateAuthToken(req.user);
  }

  @Post('/register')
  @ApiBody({ type: SignUpDto })
  @UseFilters(MongoExceptionFilter)
  async register(@Body() body: SignUpDto) {
    if (body.role === 'doctor') {
      throw new UnauthorizedException(
        'Doctor registration is not allowed please contact admin',
      );
    }
    const user = await this.userService.register(body);
    return this.authService.generateAuthToken(user);
  }
}
