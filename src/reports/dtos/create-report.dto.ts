/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    IsString,
    IsNumber,
    Min,
    Max,
    IsLongitude,
    IsLatitude,
  } from 'class-validator';
  
  export class CreateReportDto {
    @IsString()
    make: string;
  
    @IsString()
    model: string;
  
    @IsNumber()
    @Min(1990)
    @Max(2025)
    year: number;
  
    @IsNumber()
    @Min(0)
    @Max(100000)
    mileage: number;
  
    @IsLongitude()
    longi: number;
  
    @IsLatitude()
    lati: number;
  
    @IsNumber()
    @Min(0)
    @Max(100000)
    price: number;
  }
  