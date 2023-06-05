/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Expose } from 'class-transformer';

export class UserDto {

    @Expose()
    id: number;

    @Expose()
    email: string;

}
