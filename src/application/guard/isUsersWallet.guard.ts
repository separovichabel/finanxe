import { CanActivate, ExecutionContext, Injectable, BadRequestException } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from '../../infrastructure/service/user.service';
import { WalletService } from '../../infrastructure/service/wallet.service';

@Injectable()
export class IsUsersWalletGuard implements CanActivate {
    constructor(
        readonly walletService: WalletService,
        readonly userService: UserService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req: Request = context.switchToHttp().getRequest();
        const userId = parseInt(req.param('userId'), 10);
        const walletId = parseInt(req.param('walletId'), 10);

        if (!userId || !walletId)
            throw new BadRequestException('userId and walletId are necessary')

        const isUsersWallet = !!await this.walletService.getByIdOfUser(walletId, await this.userService.getById(userId));
        
        return isUsersWallet;
    }
}
