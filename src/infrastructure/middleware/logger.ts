import { RequestHandler } from 'express-serve-static-core';

export const reqLogger: RequestHandler = (req, res, next ) => {
    console.log(`URL: ${req.method} ${req.url} BODY: ${req.body} ${req}`)
    next()
}
