import { createConnection } from 'mongoose'

async function connect( project ) {
	const connection = createConnection( `mongodb://localhost:27017/${project}?authSource=admin` )
	await new Promise( ( resolve, reject ) => {
		connection.once( 'open', resolve )
		connection.once( 'error', reject )
	} )
	return connection
}

export async function createTable( database, req, res ) {

	try {

		const project = await database.Project.findOne( { id: req.body.id } ) 
		if ( !project ) throw `project ${ req.body.id } not exist.` 

		const connection = await connect( req.body.id )

		const tables = ( await connection.listCollections( ) ).map( ( { name } ) => name )
		if ( tables.includes( req.body.table ) ) throw `table ${ req.body.table } already exist.` 

		await connection.db.createCollection( req.body.table )

		await connection.close( )

		res.json( { } )

	} catch ( error ) {
		
		console.error( error )
		res.json( { error } )

	}

}

export async function readTables( database, req, res ) {

	try {

		const project = await database.Project.findOne( { id: req.body.id } ) 
		if ( !project ) throw `project ${ req.body.id } not exist.` 

		const connection = await connect( req.body.id )
		const collection = await connection.listCollections( )

		const data = await Promise.all(
			collection.map( async ( { name } ) => {
				const index = await connection.collection( name ).findOne( )
				const documents = await connection.collection( name ).countDocuments( )
				return { table: name, fields: index ? Object.keys( index ).length : 0, indexes: documents }
			} )
		)

		await connection.close( )

		res.json( { data } )

	} catch ( error ) {
		
		console.error( error )
		res.json( { error } )

	}

}

export async function readTable( database, { body }, res ) {

	try {

		const project = await database.Project.findOne( { id: body.project } ) 
		if ( !project ) throw `project ${ body.project } not exist.` 

		const connection = await connect( body.project )

		const tables = ( await connection.listCollections( ) ).map( ( { name } ) => name )

		if ( !tables.includes( body.table ) ) throw `table ${ body.table } not exist.` 
		const data = await connection.db.collection( body.table ).find({}, { projection: { _id: 0 } }).toArray()

		await connection.close( )

		res.json( { data } )

	} catch ( error ) {
		
		console.error( error )
		res.json( { error } )

	}

}

export async function deleteTable( database, { body }, res ) {

	try {

		const project = await database.Project.findOne( { id: body.project } ) 
		if ( !project ) throw `project ${ body.project } not exist.` 

		const connection = await connect( body.id )

		const tables = ( await connection.listCollections( ) ).map( ( { name } ) => name )

		if ( !tables.includes( body.table ) ) throw `table ${ body.table } not exist.` 

		await connection.db.dropCollection( body.table )

		await connection.close( )

		res.json( { } )

	} catch ( error ) {
		
		console.error( error )
		res.json( { error } )

	}

}