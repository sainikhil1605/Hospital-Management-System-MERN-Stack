import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiProduces,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import { Appointments } from '../doctor/appointments.schema';
import { User } from '../user.decorator';
import { Patient } from './patient.schema';
import { PatientService } from './patient.service';

@Controller('/api/v1/patient')
@ApiBearerAuth('access-token')
@ApiTags('Patient')
@UseGuards(JwtGuard, RolesGuard)
export class PatientController {
  constructor(private patientService: PatientService) {}

  @Roles('patient')
  @Get('/')
  @ApiProduces('application/json')
  @ApiOperation({ summary: 'Get profile of patient' })
  async getProfile(@User() user: any) {
    const { userId } = user;
    return this.patientService.getProfile(userId);
  }

  @Roles('patient')
  @Patch('/')
  @ApiOperation({ summary: 'Update profile of patient' })
  async updateProfile(@Body() userDetails: Patient, @User() user: any) {
    const { userId } = user;
    return this.patientService.updateProfile(userId, userDetails);
  }
  @Roles('patient')
  @Post('/appointment')
  @ApiOperation({ summary: 'Book appointment of patient' })
  async bookAppointment(
    @Body() appointmentDetails: Appointments,
    @User() user: any,
  ) {
    const { userId } = user;
    return this.patientService.bookAppointment(appointmentDetails, userId);
  }

  @Roles('patient')
  @Get('/appointment')
  @ApiOperation({ summary: 'Get appointments of patient' })
  async getAppointments(@User() user: any) {
    const { userId } = user;
    return this.patientService.getAppointments(userId);
  }
}
