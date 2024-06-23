import { createConnection } from 'mongoose'

export async function connectMongo( project ) {
	const connection = createConnection( `mongodb://localhost:27017/${project}?authSource=admin` )
	await new Promise( ( resolve, reject ) => {
		connection.once( 'open', resolve )
		connection.once( 'error', reject )
	} )
	return connection
}