import { Test, TestingModule } from '@nestjs/testing';
import { UserOweController } from './user-owe.controller';

describe('UserOweController', () => {
  let controller: UserOweController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserOweController],
    }).compile();

    controller = module.get<UserOweController>(UserOweController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
