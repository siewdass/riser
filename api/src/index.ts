import express, { Express, Request, Response, NextFunction } from 'express'
import { createConnection, Schema } from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import { createServer } from 'https'

dotenv.config( )

import { API } from './api'
import { Webhook } from './webhook'
import { createProject, readProjects, updateProjects, deleteProject } from './project'
import { createTable, readTables, readTable, deleteTable } from './database'
import { CDN } from './cdn'
import { Register, Login, Authorization } from './account'

const database = createConnection( `${process.env.MONGO_URI}` )
database.model( 'Project', new Schema( { id: String, name: String, email: String, repository: String, branch: String, private: Boolean, username: String, token: String } ) )
database.model( 'Function', new Schema( { name: String, path: String, code: String, packages: Array, type: String } ) )
database.model( 'Account', new Schema( { id: String, email: String, password: String } ) )

const app: Express = express()

app.use( express.json( ) )
//app.use( '/' , express.static( path.join( __dirname, '..', 'runtime' ) ) )

app.use( ( req: Request, res: Response, next: NextFunction ) => {
	res.setHeader( 'Access-Control-Allow-Origin', '*' )
	res.setHeader( 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE' )
	res.setHeader( 'Access-Control-Allow-Headers', 'Content-Type, Authorization' )
	res.setHeader( 'Access-Control-Allow-Credentials', true )
	next( )
} )

app.get( '/', ( req: Request, res: Response ) => res.send( 'Riser Hub' ) )

// ACCOUNT
app.post( '/account/register', ( req: Request, res: Response ) => Register( database.models, req, res ) )
app.post( '/account/login', ( req: Request, res: Response ) => Login( database.models, req, res ) )
app.use( ( req: Request, res: Response, next: NextFunction ) => Authorization( database.models, req,res,next ) )

// BUILD
app.post( '/webhook', ( req: Request, res: Response ) => Webhook( database.models, req, res ) )

// PROJECTS
app.post( '/project/create', ( req: Request, res: Response ) => createProject( database.models, req, res ) )
app.get( '/project/read', ( req: Request, res: Response ) => readProjects( database.models, req, res ) )
app.post( '/project/update', ( req: Request, res: Response ) => updateProjects( database.models, req, res ) )
app.post( '/project/delete', ( req: Request, res: Response ) => deleteProject( database.models, req, res ) )

// TABLES
app.post( '/table/create', ( req: Request, res: Response ) => createTable( database.models, req, res ) )
app.post( '/table/read', ( req: Request, res: Response ) => readTables( database.models, req, res ) )
app.post( '/table/data', ( req: Request, res: Response ) => readTable( database.models, req, res ) )
app.post( '/table/delete', ( req: Request, res: Response ) => deleteTable( database.models, req, res ) )

// FRONTEND FUNCTIONS
app.get( '/cdn.js', ( req: Request, res: Response ) => CDN( database.models, req, res ) )

// BACKEND FUNCTIONS
app.post( '/api/*', ( req: Request, res: Response ) => API( database.models, req, res ) )

if ( process.env.NODE_ENV == 'development' ) {
	app.listen( process.env.PORT )
} else {
	const options = { key: fs.readFileSync( __dirname + '/../../riser.key' ), cert: fs.readFileSync( __dirname + '/../../riser.crt' ) }
	createServer( options, Express ).listen( process.env.PORT )
}