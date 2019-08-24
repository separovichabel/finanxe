import * as express from 'express';
import { reqLogger } from './middleware/logger';
import { getRepository } from 'typeorm';
import { User } from '../domain/user.entity';

const router = express.Router()

router.use(reqLogger)

router.get('/', (req, res, next) => {
    res.send(getRepository(User).find())
})

export const application = express()
application.use('/', router); 