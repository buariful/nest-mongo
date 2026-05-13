import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from '../user.types';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({required:true})
  fname: string;

  @Prop({required:true})
  lname: string;

  @Prop({required:true, unique:true})
  email: string;

  @Prop({default:Role.Student, enum: Role})
  role: Role;

  @Prop({required:true, select:false})
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
