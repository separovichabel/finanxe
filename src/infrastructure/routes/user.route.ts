import * as express from 'express'
import { User } from '../../domain/entity/user.entity';
import { userValidator } from '../middleware/validators';
import { getById, getMany, save, deleteById } from '../../domain/repository/abstract.repository';

export const userRouter = express.Router()



userRouter.get('/', async (req, res) => {
    res.json(await getMany(User, 10))
})

userRouter.get('/:id', async (req, res) => {
    res.json(await getById(User, Number(req.params.id)))
})

userRouter.post('/', userValidator, async (req, res) => {
    res.json(await save(User, req.body))
})

userRouter.delete('/:id', async (req, res) => {
    const deleted = await deleteById(User, Number(req.params.id))
    if (!deleted)
        return res.status(404).send()
    res.json(deleted)
})