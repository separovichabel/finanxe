import { Module } from '@nestjs/common';
import { AppController } from './application/controllers/user.controller';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { AppLoggerModule } from './appLogger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IdToEntity } from './application/pipe/IdToEntity.pipe';

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
    InfrastructureModule,
    IdToEntity,
  ],
  controllers: [AppController],
})
export class AppModule {}
