// chat.component.ts

import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { ChatService } from './chat.service';

interface ChatMessage {
  sender: 'user' | 'ai';
  content: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy {
  messages: ChatMessage[] = [];
  eventSource: EventSource | null = null;
  currentMessage: string = '';
  isStreaming: boolean = false;

  constructor(private chatService: ChatService, private ngZone: NgZone) {}

  ngOnInit(): void {}

  sendMessage(): void {
    if (this.currentMessage.trim() === '') {
      return;
    }

    // 将用户消息添加到消息列表
    this.messages.push({
      sender: 'user',
      content: this.currentMessage,
    });

    // 关闭之前的连接（如果有）
    if (this.eventSource) {
      this.eventSource.close();
    }

    const userMessage = this.currentMessage;
    this.currentMessage = ''; // 清空输入框
    this.isStreaming = true; // 显示 "AI is typing..."

    // 连接到服务器的 SSE 端点
    this.eventSource = this.chatService.connect(userMessage);

    // 添加一个临时的 AI 消息到消息列表
    const aiMessage: ChatMessage = {
      sender: 'ai',
      content: '',
    };
    this.messages.push(aiMessage);

    this.eventSource.onmessage = (event) => {
      this.ngZone.run(() => {
        try {
          const parsedData = JSON.parse(event.data);
          if (parsedData.type === 'chunk') {
            // 更新 AI 消息的内容
            aiMessage.content += parsedData.content;
          } else if (parsedData.type === 'end') {
            // 回复结束
            this.isStreaming = false;
            if (this.eventSource) {
              this.eventSource.close();
              this.eventSource = null;
            }
          }
        } catch (e) {
          console.error('解析消息错误:', e);
        }
      });
    };

    this.eventSource.onerror = (error) => {
      console.error('EventSource 错误:', error);
      this.ngZone.run(() => {
        this.isStreaming = false;
      });
      if (this.eventSource) {
        this.eventSource.close();
        this.eventSource = null;
      }
    };
  }

  ngOnDestroy(): void {
    if (this.eventSource) {
      this.eventSource.close();
    }
  }
}
