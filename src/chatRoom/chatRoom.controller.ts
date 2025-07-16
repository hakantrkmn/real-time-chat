import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatRoom } from 'src/schemas/chatRoom.schema';
import { ChatRoomService } from './chatRoom.service';

@Controller('chat-room')
export class ChatRoomController {
  constructor(private readonly chatRoomService: ChatRoomService) {}

  @Post()
  async createChatRoom(
    @Body('name') name: string,
    @Body('createdBy') createdBy: string,
  ): Promise<ChatRoom> {
    return await this.chatRoomService.createChatRoom(name, createdBy);
  }

  @Get(':id')
  async getChatRoomMessages(@Param('id') id: string) {
    return await this.chatRoomService.getChatRoomMessages(id);
  }
}
