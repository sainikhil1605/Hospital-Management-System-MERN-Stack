import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({ example: 'John@gmail.com', description: 'User email' })
  email: string;
  @ApiProperty({ example: '123456', description: 'User password' })
  password: string;
  @ApiProperty({ example: 'John', description: 'User name' })
  name: string;
  @ApiProperty({ example: 'admin', description: 'User role' })
  role: string;
}
