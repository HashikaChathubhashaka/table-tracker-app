import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string; // Add name field

  @Prop({ required: true, enum: ['Admin', 'Normal'] })
  role: string; // Restrict role to Admin or Normal
}

export const UserSchema = SchemaFactory.createForClass(User);