import { Message } from '../app/model/User';
//not the actual response but contain how look our response
export interface ApiResponse{
    success:boolean;
    message:string;
    isAcceptingMessage?:boolean;
    messages?:Array<Message>

}