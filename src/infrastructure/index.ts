import * as express from 'express';
import { reqLogger } from './middleware/logger';
import { getRepository } from 'typeorm';
import { User } from '../domain/user.entity';
import { userValidator } from './middleware/validators';
import bodyParser = require('body-parser');

const router = express.Router()

router.use(reqLogger, bodyParser.json(), bodyParser.urlencoded({ extended: true }))

router.get('/', (req, res, next) => {
    res.send('Ta Tranquilo!!!')
})

router.get('/user', (req, res, next) => {
    res.send(getRepository(User).find())
})

router.post('/user', userValidator, (req, res, next) => {
    res.send(getRepository(User).save(req.body))
})

export const application = express()
application.use('/', router); 