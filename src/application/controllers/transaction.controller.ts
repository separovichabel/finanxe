import { Controller, Get, Param, Body, Post, Delete, UsePipes, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { AppLogger } from '../../app.logger';
import { User } from '../../domain/entity/user.entity';
import { IdToEntity } from '../pipe/idToEntity.pipe';
import { Wallet } from '../../domain/entity/wallet.entity';
import { TransactionService } from '../../infrastructure/service/transaction.service';
import { Transaction } from '../../domain/entity/transaction.entity';
import { IsUsersWalletInterceptor } from '../interceptor/isUsersWallet.interceptor';

@Controller('users/:userId/wallets/:walletId/transactions')
export class TransactionController {

  constructor(
    readonly TransactionService: TransactionService,
    readonly logger: AppLogger,
  ) {}

  @Get()
  @UseInterceptors(IsUsersWalletInterceptor)
  getMany(
    @Param('userId', IdToEntity) user: User,
    @Param('walletId', IdToEntity) wallet: Wallet,
  ): Promise<Transaction[]> {
    return this.TransactionService.getMany(user, wallet);
  }

  // @Get(':walletId')
  // getById(@Param('walletId') id: number, @Param('userId', IdToEntity) user: User): Promise<Wallet> {
  //   return this.TransactionService.getByIdOfUser(id, user);
  // }

  // @Post()
  // create(
  //   @Body(new JoiPipe(insertWalletValidator)) wallet: Wallet,
  //   @Param('userId', IdToEntity) user: User,
  // ): Promise<Wallet> {
  //   return this.TransactionService.insert(wallet, user);
  // }

  // @Put(':walletId')
  // fullUpdate(
  //   @Body(new JoiPipe(insertWalletValidator)) wallet: Wallet,
  //   @Param('userId', IdToEntity) user: User,
  //   @Param('walletId') walletId: number,
  // ): Promise<Wallet> {
  //   return this.TransactionService.update(walletId, wallet);
  // }
  
}
