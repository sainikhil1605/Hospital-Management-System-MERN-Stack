import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(readonly userService: UserService, private jwt: JwtService) {}
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findUser(email);
    if (!user) {
      throw new UnauthorizedException('User Not found');
    }
    if (user && (await user.isValidPassword(password))) {
      return user;
    }
    throw new UnauthorizedException('Invalid credentials');
  }
  async generateAuthToken(user: any) {
    return {
      access_token: this.jwt.sign({
        sub: user.id,
        role: user.role,
        name: user.name,
      }),
    };
  }
}
