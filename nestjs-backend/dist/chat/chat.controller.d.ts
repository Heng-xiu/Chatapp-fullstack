import { Observable } from 'rxjs';
export declare class ChatController {
    chat(message: string): Promise<Observable<MessageEvent>>;
}
