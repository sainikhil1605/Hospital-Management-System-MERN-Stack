import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Appointments extends mongoose.Document {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  @ApiProperty({ type: String, description: 'Doctor Id' })
  doctorId: mongoose.Schema.Types.ObjectId;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  patientId: mongoose.Schema.Types.ObjectId;

  @ApiProperty({
    type: String,
    description: 'Description of the appointment',
    example: 'I have a cold',
  })
  @Prop({ type: String })
  description: string;

  @Prop({ type: String })
  prescription: string;

  @ApiProperty({
    type: Date,
    description: 'Date of the appointment',
    example: '2020-01-01',
  })
  @Prop({
    required: true,
    type: Date,
  })
  appointmentDate: string;
  @ApiProperty({
    type: Date,
    description: 'Time of the appointment',
    example: '2020-01-01 5:40PM',
  })
  @Prop({
    required: true,
    type: Date,
  })
  appointmentTime: string;
  @ApiProperty({
    type: String,
    description: 'Status of the appointment',
    example: 'Pending',
  })
  @Prop({
    default: 'pending',
    type: String,
    enum: ['pending', 'confirmed', 'rejected'],
  })
  appointmentStatus: string;
}
export const AppointmentSchema = SchemaFactory.createForClass(Appointments);
