import * as express from 'express';
import { reqLogger } from './middleware/logger';

const router = express.Router()

router.use(reqLogger)

router.get('/', (req, res, next) => {
    res.send('Tranquilo')
})

export const application = express()
application.use('/', router); 