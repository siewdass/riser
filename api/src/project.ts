import { v4 as uuid } from 'uuid'
import jwt from 'jsonwebtoken'

const avoid = { _id: 0, __v: 0 }

export async function createProject( database, req, res ) {
	try {

		const { email, name, repository, branch, username, token } = req.body

		const project = await database.Project.findOne( { email, name } ) 
		if ( project ) throw `project ${ name } already exist.` 

		await database.Project.create( { id: uuid(), email, name, repository, branch, username, token } )

		res.status( 200 ).json( { } )

	} catch ( error ) {
		
		console.error( error )
		res.status( 400 ).json( { error } )

	}
}

export async function readProjects( database, req, res ) {
	try {

		const data = await database.Project.find( { email: req.body.email }, avoid ) 
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

		const project = await database.Project.findOne( { id: req.body.id, email: req.body.email } ) 
		if ( !project ) throw `project ${ req.body.id } not exist.` 

		const data = await database.Project.deleteOne( { id: req.body.id, email: req.body.email } )
		res.status( 200 ).json( { data } )

	} catch ( error ) {
		
		console.error( error )
		res.status( 400 ).json( { error } )

	}
}

export async function generateToken( database, req, res ) {
	try {

		const project = await database.Project.findOne( { id: req.body.id, email: req.body.email } ) 
		if ( !project ) throw `project ${ req.body.id } not exist.` 

		const token = await jwt.sign( { id: project.id }, process.env.SECRET_KEY, { expiresIn: '365d' } )

		await database.Project.updateOne( { id: req.body.id, email: req.body.email }, { token } ) 

		res.json( { token } )
  
	} catch ( error ) {
		console.error( error )
		res.status( 400 ).json( { error } )
	} 
}