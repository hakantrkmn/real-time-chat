import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatRoomService } from 'src/chatRoom/chatRoom.service';

@WebSocketGateway({
  cors: {
    origin: '*', // Production'da bunu daha spesifik bir origin ile değiştirin
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly chatRoomService: ChatRoomService) {}
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  async handleMessage(
    client: Socket,
    payload: { message: string; chatRoomName: string; senderId: string },
  ) {
    const chatRoomId = await this.chatRoomService.getChatRoomIdByName(
      payload.chatRoomName,
    );
    const message = await this.chatRoomService.addMessageToChatRoom(
      chatRoomId,
      payload.message,
      payload.senderId,
    );
    // Gelen mesajı tüm bağlı clientlara yayınla
    this.server.emit(payload.chatRoomName, {
      message: message,
      clientId: client.id,
      timestamp: new Date(),
    });
  }
}
