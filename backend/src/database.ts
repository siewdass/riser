import { Collection, createConnection } from 'mongoose'

/*export class Database {
	db
	async connect( url ) {
		this.db = createConnection( url )
	}
	async find( collection ) {
		await this.db.collection( collection ).find().toArray()
	}
}*/

export async function Database( database, { body }, res ) {

	try {
		const project = await database.Project.findOne( { name: body.project } ) 
		if ( !project ) throw `project ${ body.project } not exist.` 

		const connection = createConnection( `mongodb://localhost:27017/${body.project}?authSource=admin` )

		await new Promise( ( resolve, reject ) => {
      connection.once( 'open', resolve )
      connection.once( 'error', reject )
    } )

		let data
		const tables = ( await connection.listCollections( ) ).map( ( { name } ) => name )

		if ( body.database ) {
			data = tables
		} else {
			if ( !tables.includes( body.table ) ) throw `table ${ body.table } not exist.` 
			data = await connection.db.collection( body.table ).find({}, { projection: { _id: 0 } }).toArray()
		}

		connection.close( )

		res.json( { data } )

	} catch ( error ) {
		
		console.error( error )
		res.json( { error } )

	}

}