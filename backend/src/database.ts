import { createConnection } from 'mongoose'

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

		const conn2 = createConnection( `mongodb://localhost/${ project.name }` )
		console.log(conn2)
		res.json( {} )

	} catch ( error ) {
		
		console.error( error )
		res.json( { error } )

	}

}