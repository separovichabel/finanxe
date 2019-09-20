import * as Joi from '@hapi/joi';
import { JoinAttribute } from 'typeorm/query-builder/JoinAttribute';

export const insertWalletValidator = Joi.object({
    name: Joi.string().max(30),
    value: Joi.number(),
    owner: Joi.not(Joi.exist()),
});
