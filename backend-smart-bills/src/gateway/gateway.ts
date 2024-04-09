import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway()
export class MyGateWay{
    @WebSocketServer() server:Server;
    @SubscribeMessage('newMessage')
    onNewMessage(@MessageBody() body:any){
        console.log(body);
    }
}