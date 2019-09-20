import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../domain/entity/user.entity';

@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(User)
    readonly userRep: Repository<User>,
  ) {}

  getMany(): Promise<User[]> {
    return this.userRep.find()
  }

  getById(id: number): Promise<User> {
    return this.userRep.findOne(id);
  }

  save(user: User): Promise<User> {
    return this.userRep.save(user);
  }

  delete(user: User): Promise<User> {
    return this.userRep.remove(user);
  }
}
