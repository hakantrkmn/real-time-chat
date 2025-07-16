import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';

// Mesaj için alt şema
@Schema({ _id: false, timestamps: true })
export class Message {
  @Prop({ required: true })
  content: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  sender: User;
}

export const MessageSchema = SchemaFactory.createForClass(Message);

export type ChatRoomDocument = ChatRoom & Document;

@Schema({ timestamps: true })
export class ChatRoom {
  @Prop({ required: true, unique: true })
  name: string;
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  createdBy: string;

  @Prop({ type: [MessageSchema], default: [] })
  messages: Message[];
}

export const ChatRoomSchema = SchemaFactory.createForClass(ChatRoom);
