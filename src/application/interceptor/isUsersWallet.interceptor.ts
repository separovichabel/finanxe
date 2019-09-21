
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { WalletService } from '../../infrastructure/service/wallet.service';
import { UserService } from '../../infrastructure/service/user.service';

@Injectable()
export class IsUsersWalletInterceptor implements NestInterceptor {
  constructor(
    readonly userService: UserService,
    readonly walletService: WalletService,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const req: Request = context.switchToHttp().getRequest();
    const userId = parseInt(req.params.userId, 10);
    const walletId = parseInt(req.params.walletId, 10);

    if (!userId || !walletId)
        throw new BadRequestException('userId and walletId are necessary')

    const isUsersWallet = !!await this.walletService.getByIdOfUser(walletId, await this.userService.getById(userId));
    
    if (!isUsersWallet)
      throw new BadRequestException(`User does not posses this Wallet ${walletId}`)
    return next.handle();
  }
}