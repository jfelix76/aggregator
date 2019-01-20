import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AggController } from './agg.controller';
import { AggService } from '../services/agg.service';

describe('AggController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AggController],
      providers: [AggService],
    }).compile();
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      const appController = app.get<AggController>(AggController);
      expect(appController.root()).toBe('Hello World!');
    });
  });
});
