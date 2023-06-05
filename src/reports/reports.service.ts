/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindOperator, Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from '../users/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  /**
   * 
   * @param param0 
   * @returns 
   */
  createEstimate({ make, model, longi, lati, year, mileage }: GetEstimateDto) {
    return this.repo.createQueryBuilder()
    .select('AVG(price)', 'price')
    .where('make = :make', { make })
    .andWhere('longi - :longi BETWEEN -5 AND 5', { longi })
    .andWhere('lati - :lati BETWEEN -5 AND 5', { lati })
    .andWhere('year - :year BETWEEN -3 AND 3', { year })
    .andWhere('approved IS TRUE')
    .orderBy('ABS(mileage - :mileage)', 'DESC')
    .setParameters({ mileage })
    .limit(3)
    .getRawOne();
  }

  /**
   * 
   * @param reportDto 
   * @param user 
   * @returns 
   */
  create(reportDto: CreateReportDto, user: User) {
    const report = this.repo.create(reportDto);
    report.user = user;
    return this.repo.save(report);
  }

  /**
   * 
   * @param id 
   * @param approved 
   * @returns 
   */
  async changeApproval(id: string , approved: boolean) {
    const options: FindOneOptions<Report> = {
        where: { id: id as any },
    };
    const report = await this.repo.findOne(options);
    if (!report) {
      throw new NotFoundException('report not found');
    }

    report.approved = approved;
    return this.repo.save(report);
  }
}
