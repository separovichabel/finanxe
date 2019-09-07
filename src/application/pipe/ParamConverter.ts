import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform, NotFoundException } from '@nestjs/common';
import { validateSync, validate } from 'class-validator';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ParamConverter implements PipeTransform<any> {
    constructor(
        @InjectEntityManager()
        readonly entityManager: EntityManager,
    ) {}

    async transform(value, { metatype }: ArgumentMetadata) {
        if (!value) {
            return value;
        }

        const method = value.method;
        delete value.method;

        let entity;

        if (this.isEntity(metatype.name)) {
            if ((typeof value) === 'object') {
                entity = value.id
                    ? await this.entityManager.preload(metatype.name, value)
                    : this.entityManager.create(metatype.name, value);
            } else {
                entity = await this.entityManager.findOne(metatype.name, value);

                if (!entity) {
                    throw new NotFoundException(`Entidade '${metatype.name}' com id '${value}' não foi encontrada.`);
                }
            }
        } else {
            entity = plainToClass(metatype, value);
        }

        if (!method) {
            return entity;
        }

        const validation = validateSync(entity, {
            groups: [method],
        });

        if (validation.length > 0) {
            const messages = {};

            validation.forEach(v => {
                messages[v.property] = {value: v.value, errors: v.constraints};
            });

            throw new BadRequestException(messages);
        }

        return entity;
    }

    isEntity(name: string): boolean {
        return this.entityManager.connection.hasMetadata(name);
    }
}