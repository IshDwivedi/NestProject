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
  import { Transform } from 'class-transformer';
  
  export class GetEstimateDto {
    @IsString()
    make: string;
  
    @IsString()
    model: string;
  
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @Min(1990)
    @Max(2025)
    year: number;
  
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @Min(0)
    @Max(100000)
    mileage: number;
  
    @Transform(({ value }) => parseFloat(value))
    @IsLongitude()
    longi: number;
  
    @Transform(({ value }) => parseFloat(value))
    @IsLatitude()
    lati: number;
  }
  