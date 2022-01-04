import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { Appointments, AppointmentSchema } from './appointments.schema';

@Schema({ timestamps: true })
export class Doctor extends mongoose.Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  doctorDetails: mongoose.Types.ObjectId;
  @ApiProperty({
    type: String,
    description: 'Doctor Phone number',
    example: '+923335555555',
  })
  @Prop({ type: String })
  phone: string;
  @ApiProperty({ type: String, description: 'Doctor Address', example: 'Doha' })
  @Prop({ type: String })
  address: string;
  @ApiProperty({
    type: String,
    description: 'Doctor Specialization',
    example: 'Cardiologist',
  })
  @Prop({ type: String })
  specialization: string;
  @Prop({ type: AppointmentSchema })
  @ApiProperty({
    type: Appointments,
    isArray: true,
    description: 'Doctor Appointments',
  })
  appointments: Appointments[];
  isValidPassword: Function;
}
export const DoctorSchema = SchemaFactory.createForClass(Doctor);
