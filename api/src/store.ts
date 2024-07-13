import { connectMongo } from './utils'
import { Request, Response } from 'express'
import { Schema } from 'mongoose'

import { sign } from 'jsonwebtoken'
import { genSalt, hash, compare } from 'bcrypt'

const UserSchema = new Schema( { email: { type: String, unique: true }, password: String } )

export async function SignIn( req: Request, res: Response ) {
  
	try {
		const { email, password, project } = req.body
		if ( !email || !password || !project ) throw new Error( 'Missing required fields' )

		const connection = await connectMongo( project )

		connection.model( project, UserSchema )
    
		const user = await connection.models[ project ].findOne( { email } )
		if ( !user ) throw new Error( 'User not found' )

		const match = await compare( password, user.password )
		if ( !match ) throw new Error( 'Invalid email or password' )
    
		const token = sign( { user: user._id }, process.env.SECRET_KEY, { } )

		res.status( 200 ).json( { message: 'Sign in successful', data: { username: process.env.MOSQUITTO_USERNAME, password: process.env.MOSQUITTO_PASSWORD } } )

	} catch ( error: any ) {
    
		console.error( error )
		res.status( 500 ).json( { message: error.message } )

	}

}

export async function SignUp( req: Request, res: Response ) {
  
	try {

		const { email, password, project } = req.body
		if ( !email || !password || !project ) throw new Error( 'Missing required fields' )

		const connection = await connectMongo( project )

		connection.model( project, UserSchema )

		const index = await connection.models[ project ].findOne( { email } )

		if ( index ) throw new Error( 'Email already exists' )
	
		const salt = await genSalt( 10 )
		const hashed = await hash( password, salt )
      
		await connection.models[ project ].create( { email, password: hashed } )
		res.status( 200 ).json( { message: 'Sign up successful' } )

	} catch ( error: any ) {

		console.error( error )
		res.status( 500 ).json( { message: error.message } )

	}

}

export async function Auth( req: Request, res: Response ) {
  
	try {
		const { project, key } = req.body
		if ( !project || !key || !project ) throw new Error( 'Missing required fields' )

		if ( project != 'project' && key != 'key' ) throw new Error( 'Invalid credentials' )

		res.status( 200 ).json( { message: '', data: { username: process.env.MOSQUITTO_USERNAME, password: process.env.MOSQUITTO_PASSWORD } } )

	} catch ( error: any ) {
    
		console.error( error )
		res.status( 500 ).json( { message: error.message } )

	}
}

export async function Create( { project, table, index, value }, Mosquitto ) {
	try {
		//console.log( data )
		//+const project = await database.Project.findOne( { id: data.project } )

		//if ( !project ) throw 'Project not exist.'

		const connection = await connectMongo( project )
		const collection = connection.db.collection( table )
		await collection.insertOne( value )

		Mosquitto.publish( `/read/${ project }/${ table }${ index ? `-${ JSON.stringify( index ) }` : '' }-reload`, Buffer.from( JSON.stringify( {} ) ) )

	} catch ( error ) {
		console.error( error )
	}
}

export async function Read( { project, table, index, page, sort }, Mosquitto ) {
	try {
		const connection = await connectMongo( project )
		const collection = connection.db.collection( table )
		const items = await collection.find( index, { _id: 0 } ).toArray( )

		//const perPage = 10 //10docs in single page
		//const page = 1 //1st page
		//db.collection.find({}).skip(perPage * page).limit(perPage)

		Mosquitto.publish( `/read/${ project }/${ table }${ index ? `-${ JSON.stringify( index ) }` : '' }`, Buffer.from( JSON.stringify( items ) ) )

	} catch ( error ) {
		console.error( error )
	}
}

export async function Update( { project, table, index, value, renew }, Mosquitto ) {
	try {
		const connection = await connectMongo( project )
		const collection = connection.db.collection( table )
		await collection.updateOne( value, { $set: renew } )
  
		Mosquitto.publish( `/read/${ project }/${ table }${ index ? `-${ JSON.stringify( index ) }` : '' }-reload`, Buffer.from( JSON.stringify( {} ) ) )

	} catch ( error ) {
		console.error( error )
	}
}

export async function Delete( { project, table, index, value }, Mosquitto ) {
	try {
		const connection = await connectMongo( project )
		const collection = connection.db.collection( table )
		await collection.deleteOne( value )
  
		Mosquitto.publish( `/read/${ project }/${ table }${ index ? `-${ JSON.stringify( index ) }` : '' }-reload`, Buffer.from( JSON.stringify( {} ) ) )

	} catch ( error ) {
		console.error( error )
	}
}