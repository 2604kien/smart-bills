import { Test, TestingModule } from '@nestjs/testing';
import { UserPaidService } from './user-paid.service';

describe('UserPaidService', () => {
  let service: UserPaidService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserPaidService],
    }).compile();

    service = module.get<UserPaidService>(UserPaidService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
