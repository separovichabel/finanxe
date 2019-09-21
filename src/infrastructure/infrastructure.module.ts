import { Module } from '@nestjs/common';
import { DomainModule } from '../domain/domain.module';
import { WalletService } from './service/wallet.service';
import { UserService } from './service/user.service';
import { TransactionService } from './service/transaction.service';

const services = [
    UserService,
    WalletService,
    TransactionService,
];

@Module({
    imports: [DomainModule],
    providers: services,
    exports: services, 
})
export class InfrastructureModule {}
