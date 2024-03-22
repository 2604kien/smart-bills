import { Test, TestingModule } from '@nestjs/testing';
import { UserOweService } from './user-owe.service';

describe('UserOweService', () => {
  let service: UserOweService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserOweService],
    }).compile();

    service = module.get<UserOweService>(UserOweService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
