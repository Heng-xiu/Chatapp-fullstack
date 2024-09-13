// chat.controller.ts

import { Controller, Get, Query, Sse } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import axios from 'axios';

@Controller('chat')
export class ChatController {
  @Get()
  @Sse()
  async chat(@Query('message') message: string): Promise<Observable<MessageEvent>> {
    const subject = new Subject<MessageEvent>();

    const response = await axios({
      method: 'get',
      url: `http://127.0.0.1:8000/chat?message=${encodeURIComponent(message)}`,
      responseType: 'stream',
    });

    response.data.on('data', (chunk) => {
      const data = chunk.toString();

      // 解析 SSE 数据
      const lines = data.split('\n').filter((line) => line.startsWith('data:'));
      lines.forEach((line) => {
        const jsonString = line.replace(/^data:\s*/, '');
        try {
          const parsedData = JSON.parse(jsonString);
          subject.next({ data: JSON.stringify(parsedData) } as MessageEvent);
        } catch (err) {
          console.error('解析数据错误:', err);
        }
      });
    });

    response.data.on('end', () => {
      subject.complete();
    });

    response.data.on('error', (err) => {
      subject.error(err);
    });

    return subject.asObservable();
  }
}
