import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Appointments, AppointmentSchema } from './appointments.schema';

@Schema({ timestamps: true })
export class Doctor extends mongoose.Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  doctorId: mongoose.Types.ObjectId;
  @Prop({ type: String, required: [true, 'Phone is required'] })
  phone: string;
  @Prop({ type: String, required: [true, 'Address is required'] })
  address: string;
  @Prop({ type: String, required: [true, 'Specialization is required'] })
  specialization: string;
  @Prop({ type: AppointmentSchema })
  appointments: Appointments[];
  isValidPassword: Function;
}
export const DoctorSchema = SchemaFactory.createForClass(Doctor);
