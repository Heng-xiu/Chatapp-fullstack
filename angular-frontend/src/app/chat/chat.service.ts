import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  connect(message: string): EventSource {
    const eventSource = new EventSource(`http://localhost:3000/chat?message=${encodeURIComponent(message)}`);
    return eventSource;
  }
}
