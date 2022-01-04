import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import { User } from '../user.decorator';
import { Admin } from './admin.schema';
import { AdminService } from './admin.service';
@Controller('/api/v1/admin')
@ApiBearerAuth('access-token')
@ApiTags('Admin')
@UseGuards(JwtGuard, RolesGuard)
export class AdminController {
  constructor(private adminServie: AdminService) {}
  @Roles('admin')
  @Get('/')
  async getProfile(@User() user: any) {
    const { userId } = user;
    return this.adminServie.getAdmin(userId);
  }

  @Roles('admin')
  @Patch('/')
  @ApiBody({ type: Admin })
  async updateProfile(@Body() userDetails: any, @User() user: any) {
    const { userId } = user;
    return this.adminServie.updateAdmin(userId, userDetails);
  }

  @Roles('admin')
  @Get('/allAppointments')
  async getAllAppointments() {
    return this.adminServie.getAllAppointments();
  }
}
