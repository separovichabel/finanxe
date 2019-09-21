import { Controller, Get, Param, Body, Post, Delete, UsePipes, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { AppLogger } from '../../app.logger';
import { User } from '../../domain/entity/user.entity';
import { IdToEntity } from '../pipe/idToEntity.pipe';
import { Wallet } from '../../domain/entity/wallet.entity';
import { TransactionService } from '../../infrastructure/service/transaction.service';
import { Transaction } from '../../domain/entity/transaction.entity';
import { IsUsersWalletInterceptor } from '../interceptor/isUsersWallet.interceptor';
import { JoiPipe } from '../pipe/joiValidation.pipe';
import { insertTransactionValidator } from '../validators/transaction.validation';

@Controller('users/:userId/wallets/:walletId/transactions')
export class TransactionController {

  constructor(
    readonly transactionService: TransactionService,
    readonly logger: AppLogger,
  ) {}

  @Get()
  @UseInterceptors(IsUsersWalletInterceptor)
  async getMany(
    @Param('userId', IdToEntity) user: User,
    @Param('walletId', IdToEntity) wallet: Wallet,
  ): Promise<Transaction[]> {
    return await this.transactionService.getMany(user, wallet);
  }

  @Post()
  @UseInterceptors(IsUsersWalletInterceptor)
  create(
    @Body(new JoiPipe(insertTransactionValidator)) transaction: Transaction,
    @Param('userId', IdToEntity) user: User,
    @Param('walletId', IdToEntity) wallet: Wallet,
  ): Promise<Transaction> {
    return this.transactionService.insert(this.transactionService.compose(transaction.value, wallet));
  }

  // @Put(':walletId')
  // fullUpdate(
  //   @Body(new JoiPipe(insertWalletValidator)) wallet: Wallet,
  //   @Param('userId', IdToEntity) user: User,
  //   @Param('walletId') walletId: number,
  // ): Promise<Wallet> {
  //   return this.TransactionService.update(walletId, wallet);
  // }
  
}
