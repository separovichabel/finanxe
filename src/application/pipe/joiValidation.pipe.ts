import * as Joi from '@hapi/joi';
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class JoiPipe implements PipeTransform {
  constructor(private readonly schema: Joi.AnySchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);

    if (error) {
      throw new BadRequestException('Validation failed', JSON.stringify(error.details.map(er => er.message)));
    }
    return value;
  }
}
