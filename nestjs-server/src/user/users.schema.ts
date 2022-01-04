import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Document } from 'mongoose';
@Schema()
export class User extends Document {
  @Prop({ type: String, required: [true, 'Name is required'] })
  name: string;
  @Prop({
    type: String,
    required: [true, 'Email is required'],
    unique: [true, 'Email is already in use'],
  })
  email: string;
  @Prop({ type: String, required: [true, 'Password is required'] })
  password: string;
  @Prop({ type: String, required: [true, 'Role is required'] })
  role: string;
  isValidPassword: Function;
}
export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
UserSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
