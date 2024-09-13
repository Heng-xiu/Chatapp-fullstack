import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';

@Component({
  selector: 'app-sse-time',
  templateUrl: './sse-time.component.html',
  styleUrls: ['./sse-time.component.css']
})
export class SseTimeComponent implements OnInit, OnDestroy{
  private eventSource: EventSource | undefined;
  messages: string[] = [];

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    this.eventSource = new EventSource('http://localhost:3000/sse-time'); // Nest.js 的 SSE 端点

    this.eventSource.onmessage = (event) => {
      this.ngZone.run(() => {
        this.messages.push(event.data);
      });
    };

    this.eventSource.onerror = (error) => {
      console.error('EventSource 错误:', error);
      this.eventSource?.close();
    };
  }

  ngOnDestroy(): void {
    if (this.eventSource) {
      this.eventSource.close();
    }
  }
}
