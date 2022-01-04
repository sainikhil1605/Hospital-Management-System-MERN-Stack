import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({ example: 'John@gmail.com', description: 'User email' })
  email: string;
  @ApiProperty({ example: '123456', description: 'User password' })
  password: string;
}
