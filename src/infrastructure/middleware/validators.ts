import { RequestHandler } from 'express';

export const userValidator: RequestHandler = (req, res, next) => {
    if (!req.body) {
        console.error('No Content')
        return  res.status(400).send('No Content was provided')
    }
    next()
}