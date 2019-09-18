import { Controller, Get, Param, Body, Post, Delete, UsePipes, HttpException } from '@nestjs/common';
import { AppLogger } from '../../app.logger';
import { User } from '../../domain/entity/user.entity';
import { IdToEntity } from '../pipe/IdToEntity.pipe';
import { WalletService } from '../../infrastructure/service/wallet.service';
import { Wallet } from '../../domain/entity/wallet.entity';

@Controller('users/:userId/wallets')
export class WalletController {

  constructor(
    readonly walletService: WalletService,
    readonly logger: AppLogger,
  ) {}

  // @Get()
  // getMany(@Param() id: number): Promise<Wallet[]> {
  //   return this.walletService.getMany(id);
  // }

  // @Get(':id')
  // @UsePipes(IdToEntity)
  // getById(@Param('id') id: number): Promise<Wallet[]> {
  //   return this.walletService.getById(id);
  // }

  @Post()
  @UsePipes(IdToEntity)
  create(@Body() wallet: Wallet, @Param('userId') user: User): Promise<Wallet> {
    // return this.walletService.save(wallet, user);
    return
  }

  // @Delete(':id')
  // async delete(@Param('id') id: number): Promise<User> {
  //   const user = await this.walletService.delete(id);
    
  //   if (!user)
  //     throw new HttpException(`Usuario com id ${id} não encontrado.`, 404);

  //   return user; 
  // }
  
}
