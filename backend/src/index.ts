import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'

const git = require( 'isomorphic-git' )
const http = require( 'isomorphic-git/http/node' )
const { Volume, createFsFromVolume } = require( 'memfs' )

const vol = new Volume()
const fs = createFsFromVolume( vol )

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

app.get( '/', async ( req: Request, res: Response ) => {
	
	await git.clone( {
		fs,
		http,
		dir: '/',
		url: 'https://github.com/siewdass/react-express-webpack',
		ref: 'main',
		singleBranch: true,
		depth: 1,
	} )

	res.send( await fs.promises.readdir( '/' ) )
} )

app.listen( port, () => {
	console.log( `[server]: Server is running at http://localhost:${port}` )
} )