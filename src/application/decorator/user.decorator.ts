import { createParamDecorator } from '@nestjs/common';
import { LoggedUser } from '../../../aaa/src/module/authentication/LoggedUser';
import { Request } from 'express';

export const LoggedUserDec = createParamDecorator((data, req: Request): LoggedUser => {
    return req.user;
});

export const UserIdDec = createParamDecorator((data, req): number => {
    return req.user.id;
});