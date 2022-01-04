import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminController } from './admin/admin.controller';
import { AdminSchema } from './admin/admin.schema';
import { AdminService } from './admin/admin.service';
import { AppointmentSchema } from './doctor/appointments.schema';
import { DoctorController } from './doctor/doctor.controller';
import { DoctorSchema } from './doctor/doctor.schema';
import { DoctorService } from './doctor/doctor.service';
import { PatientController } from './patient/patient.controller';
import { PatientSchema } from './patient/patient.schema';
import { PatientService } from './patient/patient.service';
import { UserService } from './user.service';
import { UserSchema } from './users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Patient',
        schema: PatientSchema,
      },
      {
        name: 'Doctor',
        schema: DoctorSchema,
      },
      {
        name: 'Appointments',
        schema: AppointmentSchema,
      },
      {
        name: 'Admin',
        schema: AdminSchema,
      },
      {
        name: 'User',
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UserService, DoctorService, PatientService, AdminService],
  controllers: [AdminController, DoctorController, PatientController],
  exports: [UserService],
})
export class UserModule {}
