import { transform } from 'babel-standalone'
import { clone } from 'isomorphic-git'
import http from 'isomorphic-git/http/node'
import { Volume, createFsFromVolume } from 'memfs'
import { load } from 'js-yaml'

export async function Webhook( database, { query, body }, res ) {

	const project = await database.Project.findOne( { name: query.project } )

	if ( !project && !body.ref.endsWith( project.branch ) ) return

	const fs = createFsFromVolume( new Volume() )

	await clone( { fs, http, dir: '/', url: project.repository, ref: project.branch, singleBranch: true, depth: 1 } )

	const yaml = await fs.promises.readFile( '/functions.yml', 'utf-8' )
	const config = load( yaml )
	console.log( config.functions )

	await database.Function.deleteMany( { name: project.name } )

	config.functions.map( async ( { type, path, handler, packages } ) => {
		const source = await fs.promises.readFile( handler, 'utf-8' )
		const { code } = transform( source, { presets: [ 'es2015', 'react' ] } )
		await database.Function.create( { name: project.name, path, type, packages, code } ) 
	} )

	res.json( {} )
}