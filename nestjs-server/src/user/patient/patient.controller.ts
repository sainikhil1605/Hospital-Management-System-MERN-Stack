import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
@Controller('/api/v1/patient')
@ApiBearerAuth('access-token')
@ApiTags('patient')
@UseGuards(JwtGuard, RolesGuard)
export class PatientController {
  constructor() {}
  @Roles('patient')
  @Get('/')
  async check() {
    return 'doctor';
  }
}
