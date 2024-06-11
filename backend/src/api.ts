export async function API( database, req, res ) {

	try {
		const params = req.path.split( '/' )
		const project = await database.Project.findOne( { name: params[ 2 ] } )

		if ( !project ) throw 'Project not exist.'

		console.log( project.name )

		const { code } = await database.Function.findOne(
			{ name: project.name, type: 'gateway', path: `/${params[3]}` },
			{ code: true, _id: false }
		)

		console.log( code )
	} catch ( error ) {

		console.error( error )
		
	}

	console.log( req.path.split( '/' ) )
	res.json( { path: req.path.split( '/' ) } )
}
