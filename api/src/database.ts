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

		const items = await database.Table.find( { id: req.body.id } )

		const data = await Promise.all(
			items.map( async ( { table } ) => {
				const fields = await database.Archive.findOne( { id: req.body.id, table } )
				const indexes = await database.Archive.find( { id: req.body.id, table } ).count()
				return { table, fields: fields ? Object.keys( fields ).length : 0, indexes }
			} )
		)

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

		const items = await database.Archive.find( { id: body.project, table: body.table } )
		const data = items.map( e => e.value )
		console.log( data )
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