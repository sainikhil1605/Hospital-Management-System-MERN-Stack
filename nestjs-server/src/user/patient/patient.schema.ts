import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
@Schema({ timestamps: true })
export class Patient extends mongoose.Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  patientDetails: mongoose.Types.ObjectId;
  @Prop({ type: String, required: [true, 'Phone is required'] })
  phone: string;
  @Prop({ type: String, required: [true, 'Address is required'] })
  address: string;
  @Prop({ type: String, required: [true, 'Birthdate is required'] })
  birthdate: string;
  @Prop({ type: Number, required: [true, 'Age is required'] })
  age: number;
  @Prop({ type: String, required: [true, 'Blood type is required'] })
  bloodType: string;
  isValidPassword: Function;
}
export const PatientSchema = SchemaFactory.createForClass(Patient);
