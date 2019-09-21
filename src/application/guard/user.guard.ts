import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { User } from '../../domain/entity/user.entity';

@Injectable()
export class UserGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const user: User = context.switchToHttp().getRequest().user;

        if (!user) {
            return false;
        }

        return !!user.id;
    }
}
