import { application as app } from './infrastructure/index';

app.listen(8080, () => console.log('application is listening on port 8080'))