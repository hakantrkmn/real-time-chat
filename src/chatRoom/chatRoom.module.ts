import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatRoom, ChatRoomSchema } from 'src/schemas/chatRoom.schema';
import { UsersModule } from 'src/users/users.module';
import { ChatRoomController } from './chatRoom.controller';
import { ChatRoomFactory } from './chatRoom.factory';
import { ChatRoomService } from './chatRoom.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ChatRoom.name, schema: ChatRoomSchema },
    ]),
    UsersModule,
  ],
  controllers: [ChatRoomController],
  providers: [ChatRoomService, ChatRoomFactory],
  exports: [ChatRoomService],
})
export class ChatRoomModule {}
