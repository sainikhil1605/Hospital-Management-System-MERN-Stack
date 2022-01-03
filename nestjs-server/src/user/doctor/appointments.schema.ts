import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Appointments {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  patientId: mongoose.Types.ObjectId;
  @Prop({ type: String })
  name: string;
  @Prop({ type: String })
  description: string;
  @Prop({ type: String, default: Date.now() })
  date: string;
  @Prop({ type: String })
  prescription: string;
  @Prop({ type: String })
  phone: string;
}
export const AppointmentSchema = SchemaFactory.createForClass(Appointments);
