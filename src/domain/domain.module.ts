import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entity/transaction.entity';
import { User } from './entity/user.entity';
import { Wallet } from './entity/wallet.entity';

const services = [];

@Module({
    imports: [
        TypeOrmModule.forFeature([
            // Entities
            Transaction,
            User,
            Wallet,
        ]),
    ],
    providers: services,
    exports: services,
})
export class DomainModule {}
