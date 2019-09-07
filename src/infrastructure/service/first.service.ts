import { Injectable } from '@nestjs/common';
import { User, UserType } from '../../domain/model/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppLogger } from '../../module/logger/app.logger';

@Injectable()
export class BrokerService {
  constructor(
    @InjectRepository(User)
    readonly userRepository: Repository<User>,
    readonly logger: AppLogger,
  ) {}

  async getBrokerById(brokerId: number): Promise<User> {
      return await this.userRepository.findOne({id: brokerId, type: UserType.CORRETOR}); // TODO: VALIDAR REGRAS DE CORRETOR
  }
}
