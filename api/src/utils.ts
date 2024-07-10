import { createConnection } from 'mongoose'

export async function connectMongo( project ): Promise <any> {
	const connection = createConnection( `mongodb://localhost:27017/${project}?authSource=admin` )
	return new Promise( ( resolve, reject ) => {
		connection.once('open', () => resolve(connection));
		connection.once('error', reject);	
	} )
}