import * as express from 'express';
import { reqLogger } from './middleware/logger';
import * as bodyParser from 'body-parser';
import { userRouter } from './routes/user.route';

const router = express.Router()

router.use(
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    reqLogger,
)

router.get('/', (req, res) => {
    res.send('Ta Tranquilo!!!')
})


export const application = express()
application.use('/', router);
application.use('/user', userRouter);