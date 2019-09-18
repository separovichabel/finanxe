import { Module } from '@nestjs/common';
import { DomainModule } from '../domain/domain.module';
import { WalletService } from './service/wallet.service';
import { UserService } from './service/user.service';

const services = [
    UserService,
    WalletService,
];

@Module({
    imports: [DomainModule],
    providers: services,
    exports: services, 
})
export class InfrastructureModule {}
