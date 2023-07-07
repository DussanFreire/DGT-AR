import { Test, TestingModule } from '@nestjs/testing';
import { GraphConnectionController } from './graph-connection.controller';

describe('GraphConnectionController', () => {
  let controller: GraphConnectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GraphConnectionController],
    }).compile();

    controller = module.get<GraphConnectionController>(GraphConnectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
