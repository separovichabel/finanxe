import * as express from 'express';
import { reqLogger } from './middleware/logger';
import { getRepository } from 'typeorm';
import { User } from '../domain/user.entity';
import { userValidator } from './middleware/validators';
import * as bodyParser from 'body-parser';

const router = express.Router()

router.use(
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    reqLogger,
)

router.get('/', (req, res) => {
    res.send('Ta Tranquilo!!!')
})

router.delete('/user/:id', async (req, res) => {
    const userRepo = getRepository(User);
    const user = await userRepo.findOne({id: Number(req.params.id)})
    res.json(await userRepo.remove(user))
})

router.get('/user', async (req, res) => {
    res.send(await getRepository(User).find({take: 10}))
})

router.get('/user/:id', async (req, res) => {
    res.send(await getRepository(User).findOne(req.params.id))
})

router.post('/user', userValidator, async (req, res) => {
    res.send(await getRepository(User).save(req.body))
})

export const application = express()
application.use('/', router); 