import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173', // React dev server
    methods: ['GET', 'POST'],
    credentials: true,
  },

})
export class TableStatusGateway {
  @WebSocketServer()
  server: Server;

  sendTableStatusUpdate(statusUpdate: any): void {
    this.server.emit('tableStatusUpdate', statusUpdate);
  }
}