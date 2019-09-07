import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createWriteStream } from 'fs';
import { AppLogger } from './app.logger';
import * as morgan from 'morgan';
import * as cors from 'cors';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(morgan('combined', { stream: createWriteStream((process.env.STORE_PATH || '.') + '/fac-api.log', { flags: 'a' }) }));
    app.use(cors({ origin: '*' }));
    app.useLogger(app.get(AppLogger));
    await app.listen(8080);
}

bootstrap();