
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  fname: string;

  @Prop()
  lname: number;

  @Prop()
  email: string;

  @Prop()
  role: string;
}

export const CatSchema = SchemaFactory.createForClass(User);
