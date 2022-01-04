import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Admin extends mongoose.Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  adminDetails: mongoose.Types.ObjectId;
  @Prop({ type: String })
  phone: string;
  @Prop({ type: String })
  address: string;
  isValidPassword: Function;
}
export const AdminSchema = SchemaFactory.createForClass(Admin);
