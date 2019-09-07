import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { DomainModule } from '../domain/domain.module';

const services = [UserService];

@Module({
    imports: [DomainModule],
    providers: services,
    exports: services,
})
export class InfrastructureModule {}
