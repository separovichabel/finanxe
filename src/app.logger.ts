import { Injectable, Logger } from '@nestjs/common';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

@Injectable()
export class AppLogger extends Logger {
    readonly logger: winston.Logger;

    constructor(context?: string, isTimeDiffEnabled?: boolean) {
        super(context, isTimeDiffEnabled);

        this.logger = winston.createLogger({
            level: process.env.LOG_LEVEL || 'debug',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.simple(),
            ),
            transports: [
                new DailyRotateFile({
                    filename: `${process.env.STORE_PATH || '.'}/finanxe.log`,
                    zippedArchive: true,
                    maxFiles: 3,
                }),
            ],
        });
    }

    error(message: any, trace?: string, context?: string): void {
        super.error(message, trace, context);
        this.logger.error(`${message} - ${trace}`, context);
    }

    log(message: any, context?: string): void {
        super.log(message, context);
        this.logger.info(message, context);
    }

    warn(message: any, context?: string): void {
        super.warn(message, context);
        // this.logger.warning(message, context);
    }
}
