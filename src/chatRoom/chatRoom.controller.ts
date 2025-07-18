import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatRoom, Message } from 'src/schemas/chatRoom.schema';
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
  async getChatRoomMessages(@Param('id') id: string): Promise<Message[]> {
    return await this.chatRoomService.getChatRoomMessages(id);
  }

  @Get()
  async getAllChatRooms() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.chatRoomService.getAllChatRooms();
  }
}
