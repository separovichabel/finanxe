import { connection } from './domain/index'
import { application as app } from './infrastructure/index';

const startUp = async () => {
    await connection
    app.listen(8080, () => console.log('application is listening on port 8080'))
}

startUp()