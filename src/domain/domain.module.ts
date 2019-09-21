import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entity/transaction.entity';
import { User } from './entity/user.entity';
import { Wallet } from './entity/wallet.entity';

const services = [TypeOrmModule];

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Transaction,
            User,
            Wallet,
        ]),
    ],
    providers: services,
    exports: services,
})
export class DomainModule {}
