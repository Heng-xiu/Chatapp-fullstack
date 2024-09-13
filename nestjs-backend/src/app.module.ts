import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { SseTimeModule } from './sse_time/sse_time.module';

@Module({
  imports: [ChatModule, SseTimeModule],
})
export class AppModule {}
