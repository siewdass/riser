import { v4 as uuid } from 'uuid'

export async function Project( database, { body: { project, repository, branch } }, res ) {

	await database.Project.updateOne( { name: project }, { repository, branch }, { upsert: true } ) 

	res.json( {} )
}

export async function createProject( database, req, res ) {
	try {

		const { email, name } = req.body

		const project = await database.Project.findOne( { email, name } ) 
		if ( project ) throw `project ${ name } already exist.` 

		const data = await database.Project.create( { id: uuid(), email, name } )

		res.status( 200 ).json( { data } )

	} catch ( error ) {
		
		console.error( error )
		res.status( 400 ).json( { error } )

	}
}

export async function getProjects( database, req, res ) {
	try {

		const data = await database.Project.find( { email: req.body.email } ) 
		res.status( 200 ).json( { data } )

	} catch ( error ) {
		
		console.error( error )
		res.status( 400 ).json( { error } )

	}
}

export async function updateProjects( database, req, res ) {
	try {

		const project = await database.Project.findOne( { name: req.body.name, email: req.body.email } ) 
		if ( !project ) throw `project ${ req.body.name } not exist.` 

		const data = await database.Project.updateOne( { name: req.body.name, email: req.body.email }, req.body.project ) 

		res.status( 200 ).json( { data } )

	} catch ( error ) {
		
		console.error( error )
		res.status( 400 ).json( { error } )

	}
}

export async function deleteProject( database, req, res ) {
	try {

		const project = await database.Project.findOne( { name: req.body.name, email: req.body.email } ) 
		if ( !project ) throw `project ${ req.body.name } not exist.` 

		const data = await database.Project.deleteOne( { name: req.body.name, email: req.body.email } )
		res.status( 200 ).json( { data } )

	} catch ( error ) {
		
		console.error( error )
		res.status( 400 ).json( { error } )

	}
}
