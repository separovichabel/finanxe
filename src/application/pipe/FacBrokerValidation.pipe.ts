import { PipeTransform, Injectable, ArgumentMetadata, HttpException } from '@nestjs/common';
import { BrokerService } from '../../infrastructure/services/broker.service';
import { FacInternInsertion } from '../../infrastructure/services/facInternal.service';

@Injectable()
export class FacInternInsertionValitation implements PipeTransform {

  constructor(
    readonly brokerService: BrokerService,
  ) {}

  async transform(body: FacInternInsertion, metadata: ArgumentMetadata) {

    if (!body || !body.brokerId) {
      throw new HttpException('Id do corretor precisa ser informado', 400);
    }

    const broker = await this.brokerService.getBrokerById(body.brokerId);

    if (!broker) {
      throw new HttpException('Id do corretor não existe', 400);
    }

    return body;
  }
}
