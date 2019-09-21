import { Module } from '@nestjs/common';
import { UserController } from './application/controllers/user.controller';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { AppLoggerModule } from './appLogger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdToEntity } from './application/pipe/idToEntity.pipe';
import { WalletController } from './application/controllers/wallet.controller';
import { TransactionController } from './application/controllers/transaction.controller';
import { IsUsersWalletGuard } from './application/guard/isUsersWallet.guard';

@Module({
  imports: [
    AppLoggerModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      logging: !!parseInt(process.env.DEBUG || '0', 10),
      logger: 'advanced-console',
    }),
    IdToEntity,
    InfrastructureModule,
    // IsUsersWalletGuard,
  ],
  controllers: [
    UserController,
    WalletController,
    TransactionController,
  ],
})
export class AppModule {}
