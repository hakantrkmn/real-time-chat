import { Injectable } from '@nestjs/common';
import { PopulateOptions } from 'mongoose';

@Injectable()
export class ChatRoomFactory {
  getChatRoomMessagesOptions(): PopulateOptions {
    return {
      path: 'messages.sender',
      select: 'username',
      populate: { path: 'chatRooms', select: 'name' },
    };
  }
}
