import { connectMongo } from './utils'
import { Request, Response } from 'express'
import { Schema } from 'mongoose'

import { sign, verify } from 'jsonwebtoken'
import { genSalt, hash, compare } from 'bcrypt'

const UserSchema = new Schema( { email: { type: String, unique: true }, password: String } )

export async function SignIn( database, req: Request, res: Response ) {
  
	try {

		/*if ( !req.body.token ) throw new Error( 'Missing required fields' )
		
		const { id } = await verify( req.body.token, process.env.SECRET_KEY )

		const project = await database.Project.findOne( { id } )

		const connection = await connectMongo( project.name )

		connection.model( project, UserSchema )
    
		const user = await connection.models[ project ].findOne( { email } )
		if ( !user ) throw new Error( 'User not found' )

		const match = await compare( password, user.password )
		if ( !match ) throw new Error( 'Invalid email or password' )
    
		const token = sign( { user: user._id }, process.env.SECRET_KEY, { } )

		res.status( 200 ).json( { message: 'Sign in successful', data: { username: process.env.MOSQUITTO_USERNAME, password: process.env.MOSQUITTO_PASSWORD } } )*/

	} catch ( error: any ) {
    
		console.error( error )
		res.status( 500 ).json( { message: error.message } )

	}

}

export async function SignUp( database, req: Request, res: Response ) {
  
	try {

		/*const { email, password, project } = req.body
		if ( !email || !password || !project ) throw new Error( 'Missing required fields' )

		const connection = await connectMongo( project )

		connection.model( project, UserSchema )

		const index = await connection.models[ project ].findOne( { email } )

		if ( index ) throw new Error( 'Email already exists' )
	
		const salt = await genSalt( 10 )
		const hashed = await hash( password, salt )
      
		await connection.models[ project ].create( { email, password: hashed } )*/
		res.status( 200 ).json( { message: 'Sign up successful' } )

	} catch ( error: any ) {

		console.error( error )
		res.status( 500 ).json( { message: error.message } )

	}

}

export async function Auth( database, req: Request, res: Response ) {
	try {

		const { id } = await verify( req.body.token, process.env.SECRET_KEY )
		const project = await database.Project.findOne( { id, token: req.body.token } )
		if ( !project ) throw new Error( 'Project not exist.' )

		res.status( 200 ).json( { message: '', data: { username: process.env.MOSQUITTO_USERNAME, password: process.env.MOSQUITTO_PASSWORD } } )

	} catch ( error: any ) {
    
		console.error( error )
		res.status( 500 ).json( { message: error.message } )

	}
}

export async function Create( database, { token, table, index, value }, Mosquitto ) {
	try {
		const { id } = await verify( token, process.env.SECRET_KEY )
		const project = await database.Project.findOne( { id } )
		if ( !project ) throw 'Project not exist.'

		const exist = await database.Table.findOne( { id, table } )
		if ( !exist ) await database.Table.create( { id, table } )

		await database.Archive.create( { id, table, value } )

		Mosquitto.publish( `/read/${ token }/${ table }${ index ? `-${ JSON.stringify( index ) }` : '' }-reload`, Buffer.from( JSON.stringify( {} ) ) )

	} catch ( error ) {
		console.error( error )
	}
}

export async function Read( database, { token, table, index, page, sort }, Mosquitto ) {
	try {

		const { id } = await verify( token, process.env.SECRET_KEY )
		const project = await database.Project.findOne( { id } )
		if ( !project ) throw 'Project not exist.'

		const indexed = Object.entries( index ).reduce( ( acc, [ key, value ] ) => ( { ...acc, [`value.${key}`]: value } ), {} )
		const data = await database.Archive.find( { id, table, ...indexed }, { _id: 0, __v: 0 } ) 
		const items = data.map( e => e.value )
		
		//const perPage = 10 //10docs in single page
		//const page = 1 //1st page
		//db.collection.find({}).skip(perPage * page).limit(perPage)

		Mosquitto.publish( `/read/${ token }/${ table }${ index ? `-${ JSON.stringify( index ) }` : '' }`, Buffer.from( JSON.stringify( items ) ) )

	} catch ( error ) {
		console.error( error )
	}
}

export async function Update( database, { token, table, index, value, renew }, Mosquitto ) {
	try {

		const { id } = await verify( token, process.env.SECRET_KEY )
		const project = await database.Project.findOne( { id } )
		if ( !project ) throw 'Project not exist.'

		await database.Archive.updateOne( { id, table, value }, { $set: { value: renew } } )
  
		Mosquitto.publish( `/read/${ token }/${ table }${ index ? `-${ JSON.stringify( index ) }` : '' }-reload`, Buffer.from( JSON.stringify( {} ) ) )

	} catch ( error ) {
		console.error( error )
	}
}

export async function Delete( database, { token, table, index, value }, Mosquitto ) {
	try {

		const { id } = await verify( token, process.env.SECRET_KEY )
		const project = await database.Project.findOne( { id } )
		if ( !project ) throw 'Project not exist.'

		await database.Archive.deleteOne( { id, table, value } )
  
		Mosquitto.publish( `/read/${ token }/${ table }${ index ? `-${ JSON.stringify( index ) }` : '' }-reload`, Buffer.from( JSON.stringify( {} ) ) )

	} catch ( error ) {
		console.error( error )
	}
}