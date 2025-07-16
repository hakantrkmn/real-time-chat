import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatRoom, ChatRoomDocument } from 'src/schemas/chatRoom.schema';
import { UsersService } from 'src/users/users.service';
import { ChatRoomFactory } from './chatRoom.factory';
@Injectable()
export class ChatRoomService {
  constructor(
    @InjectModel(ChatRoom.name) private chatRoomModel: Model<ChatRoomDocument>,
    private readonly usersService: UsersService,
    private readonly chatRoomFactory: ChatRoomFactory,
  ) {}

  async createChatRoom(name: string, createdBy: string): Promise<ChatRoom> {
    if (!name || !createdBy) {
      throw new BadRequestException(
        'Chat odası adı ve oluşturan kullanıcı adı gereklidir',
      );
    }

    const existingChatRoom = await this.chatRoomModel.findOne({ name }).exec();
    if (existingChatRoom) {
      throw new ConflictException('Bu chat odası zaten mevcut');
    }
    const user = await this.usersService.getUserModelById(createdBy);
    if (!user) {
      throw new NotFoundException('Kullanıcı bulunamadı');
    }
    const chatRoom = new this.chatRoomModel({ name, createdBy });
    const savedChatRoom = await chatRoom.save();

    console.log(user);
    user.chatRooms.push(savedChatRoom._id as string);
    await user.save();
    return savedChatRoom;
  }
  async addMessageToChatRoom(
    chatRoomId: string,
    message: string,
    senderId: string,
  ) {
    console.log(chatRoomId);
    const chatRoom = await this.chatRoomModel.findById(chatRoomId).exec();
    if (!chatRoom) {
      throw new NotFoundException('Chat odası bulunamadı');
    }
    const user = await this.usersService.getUserModelById(senderId);
    if (!user) {
      throw new NotFoundException('Kullanıcı bulunamadı');
    }
    chatRoom.messages.push({ content: message, sender: user });
    await chatRoom.save();
    return { content: message, sender: user };
  }

  async getChatRoomIdByName(name: string) {
    const chatRoom = await this.chatRoomModel.findOne({ name }).exec();
    if (!chatRoom) {
      throw new NotFoundException('Chat odası bulunamadı');
    }
    return chatRoom._id as string;
  }

  async getChatRoomMessages(chatRoomId: string) {
    const chatRoom = await this.chatRoomModel
      .findById(chatRoomId)
      .populate(this.chatRoomFactory.getChatRoomMessagesOptions())
      .exec();
    if (!chatRoom) {
      throw new NotFoundException('Chat odası bulunamadı');
    }
    return chatRoom.messages;
  }

  async getAllChatRooms() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.chatRoomModel
      .find()
      .populate(this.chatRoomFactory.getChatRoomMessagesOptions())
      .transform(this.chatRoomFactory.removeIdAndVersion().transform)
      .exec();
  }
}
