import { RequestHandler } from 'express';

export const userValidator: RequestHandler = (req, res, next) => {
    if (req.body) return  res.status(400).send('No Content')
    next()
}