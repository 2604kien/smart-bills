import { IsNotEmpty } from 'class-validator';
import { Bill } from 'src/entities/bill.entity';
import { UserDetail } from 'src/entities/userdetail.entity';

export class UserPaidDto {
  @IsNotEmpty()
  user: UserDetail;
  @IsNotEmpty()
  bill: Bill;
  @IsNotEmpty()
  paidAmount: string;
}
