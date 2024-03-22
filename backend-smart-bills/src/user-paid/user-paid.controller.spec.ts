import { Test, TestingModule } from '@nestjs/testing';
import { UserPaidController } from './user-paid.controller';

describe('UserPaidController', () => {
  let controller: UserPaidController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserPaidController],
    }).compile();

    controller = module.get<UserPaidController>(UserPaidController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
