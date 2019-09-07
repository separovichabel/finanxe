import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../domain/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRep: Repository<User>,
  ) {}

  getMany(): Promise<User[]> {
    return this.userRep.find()
  }

  getById(userId: number): Promise<User> {
      return this.userRep.findOne(userId); // TODO: VALIDAR REGRAS DE CORRETOR
  }

  create(user: User): Promise<User> {
    return this.userRep.save(user);
  }
}
