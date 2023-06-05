/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsBoolean } from 'class-validator';

export class ApproveReportDto {
  @IsBoolean()
  approved: boolean;
}
