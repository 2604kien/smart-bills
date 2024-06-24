import { IsNotEmpty, IsNumber } from 'class-validator';
import { Bill } from 'src/entities/bill.entity';
import { UserDetail } from 'src/entities/userdetail.entity';
type OweBill = {
  id: number;
};
export class UserOweDto {
  @IsNotEmpty()
  @IsNumber()
  oweAmount: string;
  @IsNotEmpty()
  user: UserDetail;
  @IsNotEmpty()
  bill: Bill;
}
export class UserOweListDto {
  @IsNotEmpty()
  currList: OweBill[];
}
