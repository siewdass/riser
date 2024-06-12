import vm from 'vm'

export async function API( database, req, res ) {

	try {
		const params = req.path.split( '/' )
		const project = await database.Project.findOne( { name: params[ 2 ] } )

		if ( !project ) throw 'Project not exist.'

		const { code } = await database.Function.findOne(
			{ name: project.name, type: 'gateway', path: `/${params[3]}` },
			{ code: true, _id: false }
		)

		console.log( code )

		const sandbox = { console, exports: {} }
		var context = vm.createContext( sandbox )
		const a = vm.runInNewContext( code, context ) //, { timeout : 100 })
		
		console.log( a, sandbox.exports )

	} catch ( error ) {

		console.error( error )
		
	}

	console.log( req.path.split( '/' ) )
	res.json( { path: req.path.split( '/' ) } )
}
