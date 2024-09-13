import { Module } from '@nestjs/common';
import { SseTimeController } from './sse_time.controller';

@Module({
  controllers: [SseTimeController]
})
export class SseTimeModule {}
