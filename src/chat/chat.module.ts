import { Module } from '@nestjs/common';
import { ChatRoomModule } from 'src/chatRoom/chatRoom.module';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [ChatRoomModule],
  providers: [ChatGateway],
})
export class ChatModule {}
