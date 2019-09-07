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

  getById(id: number): Promise<User> {
      return this.userRep.findOne(id); // TODO: VALIDAR REGRAS DE CORRETOR
  }

  save(user: User): Promise<User> {
    return this.userRep.save(user);
  }

  async delete(user: User): Promise<User> {
    return this.userRep.remove(user);
  }
}
