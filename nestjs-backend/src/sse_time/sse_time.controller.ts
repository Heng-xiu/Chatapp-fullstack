import { Controller, Get, Sse } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import axios from 'axios';

@Controller('sse-time')
export class SseTimeController {
  @Get()
  @Sse()
  async sse(): Promise<Observable<MessageEvent>> {
    const subject = new Subject<MessageEvent>();

    const response = await axios({
      method: 'get',
      url: 'http://127.0.0.1:8000/sse_time', // FastAPI 的 SSE 端点
      responseType: 'stream',
    });

    response.data.on('data', (chunk) => {
        const data = chunk.toString();
  
        // 去掉多余的 'data:' 前缀和空行
        const lines = data.split('\n').filter((line) => line.startsWith('data:'));
        const message = lines.map((line) => line.replace(/^data:\s*/, '')).join('\n');
  
        if (message) {
          subject.next({ data: message } as MessageEvent);
        }
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
