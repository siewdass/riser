import express, { Express, Request, Response, NextFunction } from 'express'
import { createConnection, Schema } from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

import { API } from './api'
import { Webhook } from './webhook'
import { Project } from './project'
import { CDN } from './cdn'

const database = createConnection( 'mongodb+srv://siewdass:FezkD69pMtZ7urBM@cluster.aedntya.mongodb.net/?retryWrites=true&w=majority&appName=Cluster' )
database.model( 'Project', new Schema( { name: String, repository: String, branch: String } ) )
database.model( 'Function', new Schema( { name: String, path: String, code: String, packages: Array, type: String } ) )
database.model( 'Account', new Schema( { email: String, password: String } ) )

console.log( process.env )

const app: Express = express()
const port = process.env.PORT || 3000

app.use( express.json() )
app.use( ( req: Request, res: Response, next: NextFunction ) => {
	res.setHeader( 'Access-Control-Allow-Origin', '*' )
	res.setHeader( 'Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE' )
	res.setHeader( 'Access-Control-Allow-Headers', 'X-Requested-With,content-type' )
	res.setHeader( 'Access-Control-Allow-Credentials', true )
	next( )
} )

app.get( '/', async ( req: Request, res: Response ) => res.send( 'sdas' ) )

// BUILD
app.post( '/webhook', async ( req: Request, res: Response ) => Webhook( database.models, req, res ) )

// PROJECTS
app.post( '/project', async ( req: Request, res: Response ) => Project( database.models, req, res ) )

// FRONTEND FUNCTIONS
app.get( '/cdn.js', async ( req: Request, res: Response ) => CDN( database.models, req, req ) )

// BACKEND FUNCTIONS
app.post( '/*', async ( req: Request, res: Response ) => API( database.models, req, res ) )

app.listen( port )