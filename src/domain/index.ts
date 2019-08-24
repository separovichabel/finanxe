import {getConnectionOptions, createConnection} from 'typeorm';

const getDatabaseConnection = async () => {
    
    const connOpt = await getConnectionOptions()

    return await createConnection(connOpt);
};

export const connection = getDatabaseConnection();