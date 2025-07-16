import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatModule } from './chat/chat.module';
import { ChatRoomModule } from './chatRoom/chatRoom.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/realTimeChat'),
    ChatModule,
    UsersModule,
    ChatRoomModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
