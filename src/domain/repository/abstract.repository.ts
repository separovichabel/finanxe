import { getRepository, ObjectType } from "typeorm";

export const getById = async <Entity>(entity: ObjectType<Entity>, id: number) => {
    const entityRepo = getRepository(entity)
    return await entityRepo.findOne(id);
}

export const getMany = async <Entity>(entity: ObjectType<Entity>, take?: number, skip?: number) => {
    const entityRepo = getRepository(entity)
    return await entityRepo.find({take, skip});
}

export const save = async <Entity>(entity: ObjectType<Entity>, instance: Entity | any) => {
    const entityRepo = getRepository(entity)
    return await entityRepo.save(instance);
}

export const deleteById = async <Entity>(entity: ObjectType<Entity>, id: number) => {
    const entityRepo = getRepository(entity)
    const instance = await getById(entity, id)
    if (!instance)
        return undefined;
    return await entityRepo.remove(instance);
}