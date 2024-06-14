import express, { Express, Request, Response, NextFunction } from 'express'
import { createConnection, Schema } from 'mongoose'
import dotenv from 'dotenv'

dotenv.config( )

import { API } from './api'
import { Webhook } from './webhook'
import { Project } from './project'
import { Database } from './database'
import { CDN } from './cdn'

const database = createConnection( `${process.env.MONGO_URI}` )
database.model( 'Project', new Schema( { name: String, repository: String, branch: String } ) )
database.model( 'Function', new Schema( { name: String, path: String, code: String, packages: Array, type: String } ) )
database.model( 'Account', new Schema( { email: String, password: String } ) )

const app: Express = express()

app.use( express.json( ) )
app.use( ( req: Request, res: Response, next: NextFunction ) => {
	res.setHeader( 'Access-Control-Allow-Origin', '*' )
	res.setHeader( 'Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE' )
	res.setHeader( 'Access-Control-Allow-Headers', 'X-Requested-With,content-type' )
	res.setHeader( 'Access-Control-Allow-Credentials', true )
	next( )
} )

app.get( '/', ( req: Request, res: Response ) => res.send( 'Riser' ) )

// BUILD
app.post( '/webhook', ( req: Request, res: Response ) => Webhook( database.models, req, res ) )

// PROJECTS
app.post( '/project', ( req: Request, res: Response ) => Project( database.models, req, res ) )

// DATABASES
app.post( '/database', ( req: Request, res: Response ) => Database( database.models, req, res ) )

// FRONTEND FUNCTIONS
app.get( '/cdn.js', ( req: Request, res: Response ) => CDN( database.models, req, res ) )

// BACKEND FUNCTIONS
app.post( '/api/*', ( req: Request, res: Response ) => API( database.models, req, res ) )

app.listen( process.env.PORT )