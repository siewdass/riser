import { createConnection } from 'mongoose'

async function connect( project ) {
	const connection = createConnection( `mongodb://localhost:27017/${project}?authSource=admin` )
	await new Promise( ( resolve, reject ) => {
		connection.once( 'open', resolve )
		connection.once( 'error', reject )
	} )
	return connection
}

export async function createTable( database, { body }, res ) {

	try {

		const project = await database.Project.findOne( { name: body.project } ) 
		if ( !project ) throw `project ${ body.project } not exist.` 

		const connection = await connect( body.project )

		const tables = ( await connection.listCollections( ) ).map( ( { name } ) => name )
		if ( tables.includes( body.table ) ) throw `table ${ body.table } already exist.` 

		await connection.db.createCollection( body.table )

		await connection.close( )

		res.json( { } )

	} catch ( error ) {
		
		console.error( error )
		res.json( { error } )

	}

}

export async function readDatabase( database, { body }, res ) {

	try {

		const project = await database.Project.findOne( { name: body.project } ) 
		if ( !project ) throw `project ${ body.project } not exist.` 

		const connection = await connect( body.project )

		const data = ( await connection.listCollections( ) ).map( ( { name } ) => ( { name } ) )

		await connection.close( )

		res.json( { data } )

	} catch ( error ) {
		
		console.error( error )
		res.json( { error } )

	}

}

export async function readTable( database, { body }, res ) {

	try {

		const project = await database.Project.findOne( { name: body.project } ) 
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