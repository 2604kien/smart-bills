import { IsNotEmpty, IsNumber } from 'class-validator';
import { UserDetail } from 'src/entities/userdetail.entity';
type UserInvolve = {
  isPaid: boolean;
  amount: string;
  userId: number;
  userFullName: string;
};

export class BillDto {
  @IsNotEmpty()
  @IsNumber()
  totalCost: string;
  @IsNotEmpty()
  title: string;
  description: string;
  @IsNotEmpty()
  @IsNumber()
  numberPeople: number;
  @IsNotEmpty()
  creator: UserDetail;
  @IsNotEmpty()
  userList: UserInvolve[];
}
export class UpdateBillDto {
  creator: UserDetail;
}
export class BillListDto {
  @IsNotEmpty()
  currList: { id: number }[];
}
