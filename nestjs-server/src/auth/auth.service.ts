import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(readonly userService: UserService, private jwt: JwtService) {}
  async validateUser(
    email: string,
    password: string,
    role: string,
  ): Promise<any> {
    const user = await this.userService.findUser(email, role);
    if (user && (await user.isValidPassword(password))) {
      return user;
    }
    return null;
  }
  async generateAuthToken(user: any) {
    console.log(user);
    return {
      access_token: this.jwt.sign({
        sub: user.id,
        role: user.role,
        name: user.name,
      }),
    };
  }
}
