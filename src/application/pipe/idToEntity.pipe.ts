import { ArgumentMetadata, Injectable, PipeTransform, NotFoundException, HttpException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';

@Injectable()
export class IdToEntity implements PipeTransform<any> {
    constructor(
        @InjectEntityManager()
        readonly entityManager: EntityManager,
    ) {}

    async transform(value: string, { metatype }: ArgumentMetadata) {
        const id = parseInt(value, 10)

        if (!this.entityManager.connection.hasMetadata(metatype.name)) {
            throw new HttpException('Internal Server Error: Bad Implementation.', 500);
        }

        if (!id) {
            throw new HttpException(`${id} is not a vailed id.`, 400);
        }

        const entity = await this.entityManager.findOne(metatype.name, id);

        if (!entity) {
            throw new NotFoundException(`Entidade '${metatype.name}' com id '${id}' não foi encontrada.`);
        }
        return entity
    }
}