import vm from 'vm'

export async function API( database, req, res ) {

	try {
		const params = req.path.split( '/' )
		const project = await database.Project.findOne( { id: params[ 2 ] } )

		if ( !project ) throw 'Project not exist.'

		const { code } = await database.Function.findOne(
			{ name: project.name, type: 'gateway', path: `/${params[3]}` },
			{ code: true, _id: false }
		)

		const sandbox = { console, exports: {}, params: { database: 1 } }
		const context = vm.createContext( sandbox )
		const data = vm.runInNewContext( code, context ) //, { timeout : 100 })

		res.json( { data } )

	} catch ( error ) {

		console.error( error )
		res.json( { error } )
		
	}

}
