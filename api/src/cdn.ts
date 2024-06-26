export async function CDN( database, req, res ) {

	res.setHeader( 'Content-Type', 'text/javascript' )

	try {

		const project = await database.Project.findOne( { id: req.query.project } )
		if ( !project ) throw `project ${ req.query.project } not exist.` 

		const { code } = await database.Function.findOne(
			{ name: project.name, type: 'view' },
			{ code: true, _id: false }
		)

		res.send( code )

	} catch ( error ) {

		res.send( `console.log('${ error }')` )

	}

}