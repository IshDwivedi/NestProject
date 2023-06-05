/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  /**
   * 
   * @param email 
   * @param password 
   * @returns 
   */
  create(email: string, password: string) {
    const user = this.repo.create({ email, password });

    return this.repo.save(user);
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  findOne(id: number) {
    if (!id) {
      return null;
    }
    const options: FindOneOptions<User> = {
      where: { id },
    };
    return this.repo.findOne(options);
  }

  /**
   * 
   * @param email 
   * @returns 
   */
  find(email: string) {
    const options: FindManyOptions<User> = {
      where: { email },
    };
    return this.repo.find( options );
  }

  /**
   * 
   * @param id 
   * @param attrs 
   * @returns 
   */
  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.repo.remove(user);
  }
}
