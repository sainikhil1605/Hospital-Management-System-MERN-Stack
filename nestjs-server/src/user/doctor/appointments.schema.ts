import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

@Schema()
export class Appointments extends mongoose.Document {
  @ApiProperty({ type: String, description: 'Patient Id', example: '12345' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  patientId: mongoose.Types.ObjectId;
  @Prop({ type: String })
  @ApiProperty({ description: 'Patient Name', example: 'John Doe' })
  name: string;
  @Prop({ type: String })
  @ApiProperty({
    description: 'Appointment description',
    example: 'Suffering from fever',
  })
  description: string;
  @Prop({ type: String, default: Date.now() })
  @ApiProperty({ description: 'Appointment Date', example: '2020-01-01' })
  date: string;
  @Prop({ type: String })
  @ApiProperty({
    description: 'Prescription by doctor',
    example: 'Paracetomol',
  })
  prescription: string;
  @Prop({ type: String, enum: ['pending', 'accepted', 'rejected'] })
  @ApiProperty({
    description: 'Appointment Status',
    example: 'pending',
    enum: ['pending', 'accepted', 'rejected'],
  })
  status: string;
}
export const AppointmentSchema = SchemaFactory.createForClass(Appointments);
