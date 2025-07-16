import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  // Kullanıcının oluşturduğu chat odalarına referans
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'ChatRoom' }] })
  chatRooms: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
