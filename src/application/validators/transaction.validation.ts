import * as Joi from '@hapi/joi';

export const insertTransactionValidator = Joi.object({
    value: Joi.number(),
    date: Joi.date().optional(),
});
