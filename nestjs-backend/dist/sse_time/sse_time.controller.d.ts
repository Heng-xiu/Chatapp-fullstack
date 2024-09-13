import { Observable } from 'rxjs';
export declare class SseTimeController {
    sse(): Promise<Observable<MessageEvent>>;
}
