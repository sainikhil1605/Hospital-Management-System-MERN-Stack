import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Patient extends mongoose.Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  patientDetails: mongoose.Types.ObjectId;
  @Prop({ type: String })
  phone: string;
  @Prop({ type: String })
  address: string;
  @Prop({ type: String })
  birthdate: string;
  @Prop({ type: Number })
  age: number;
  @Prop({ type: String })
  bloodType: string;

  isValidPassword: Function;
}
export const PatientSchema = SchemaFactory.createForClass(Patient);
