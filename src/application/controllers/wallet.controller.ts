import { Controller, Get, Param, Body, Post, Put } from '@nestjs/common';
import { AppLogger } from '../../app.logger';
import { User } from '../../domain/entity/user.entity';
import { IdToEntity } from '../pipe/idToEntity.pipe';
import { WalletService } from '../../infrastructure/service/wallet.service';
import { Wallet } from '../../domain/entity/wallet.entity';
import { JoiPipe } from '../pipe/joiValidation.pipe';
import { insertWalletValidator } from '../validators/wallet.validation';

@Controller('users/:userId/wallets')
export class WalletController {

  constructor(
    readonly walletService: WalletService,
    readonly logger: AppLogger,
  ) {}

  @Get()
  getMany(@Param('userId') user: User): Promise<Wallet[]> {
    return this.walletService.getMany(user);
  }

  @Get(':walletId')
  getById(@Param('walletId') id: number, @Param('userId', IdToEntity) user: User): Promise<Wallet> {
    return this.walletService.getByIdOfUser(id, user);
  }

  @Post()
  create(
    @Body(new JoiPipe(insertWalletValidator)) wallet: Wallet,
    @Param('userId', IdToEntity) user: User,
  ): Promise<Wallet> {
    return this.walletService.insert(wallet, user);
  }

  @Put(':walletId')
  fullUpdate(
    @Body(new JoiPipe(insertWalletValidator)) wallet: Wallet,
    @Param('userId', IdToEntity) user: User,
    @Param('walletId') walletId: number,
  ): Promise<Wallet> {
    return this.walletService.update(walletId, wallet);
  }

  // @Delete(':id')
  // async delete(@Param('id') id: number): Promise<User> {
  //   const user = await this.walletService.delete(id);
    
  //   if (!user)
  //     throw new HttpException(`Usuario com id ${id} não encontrado.`, 404);

  //   return user; 
  // }
  
}
