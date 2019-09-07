import { Controller, Get, Param, Body, Post, Delete, UsePipes, HttpException } from '@nestjs/common';
import { AppLogger } from '../../app.logger';
import { User } from '../../domain/entity/user.entity';
import { IdToEntity } from '../pipe/IdToEntity.pipe';
import { WalletService } from '../../infrastructure/service/wallet.service';

@Controller('users')
export class AppController {

  constructor(
    readonly walletService: WalletService,
    readonly logger: AppLogger,
  ) {}

  @Get()
  getMany(@Param() id: number): Promise<User[]> {
    return this.walletService.getMany();
  }

  @Get(':id')
  @UsePipes(IdToEntity)
  getById(@Param('id') id: number): Promise<User> {
    return this.walletService.getById(id);
  }

  @Post()
  create(@Body() user: User): Promise<User> {
    return this.walletService.save(user);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<User> {
    const user = await this.walletService.delete(id);
    
    if (!user)
      throw new HttpException(`Usuario com id ${id} não encontrado.`, 404);

    return user; 
  }
  
}
