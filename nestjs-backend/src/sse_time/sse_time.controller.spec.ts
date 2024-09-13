import { Test, TestingModule } from '@nestjs/testing';
import { SseTimeController } from './sse_time.controller';

describe('SseTimeController', () => {
  let controller: SseTimeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SseTimeController],
    }).compile();

    controller = module.get<SseTimeController>(SseTimeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
