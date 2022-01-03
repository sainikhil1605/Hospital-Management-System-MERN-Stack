import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { AuthDto } from './auth/dto/auth.dto';
import { LocalGuard } from './auth/guards/local.guard';
import { UserService } from './user/user.service';

@Controller()
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
  @ApiBody({ type: AuthDto })
  register(@Body() body: any) {
    return this.userService.register(body);
  }
}
