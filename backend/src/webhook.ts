import { transform } from 'babel-standalone'
import { clone } from 'isomorphic-git'
import http from 'isomorphic-git/http/node'
import { Volume, createFsFromVolume } from 'memfs'
import { load } from 'js-yaml'

export async function Webhook( database, { query, body }, res ) {

	try {
		const project = await database.Project.findOne( { name: query.project } )

		if ( !project && !body.ref.endsWith( project.branch ) ) throw 'Not the select branch.'
		
		const fs = createFsFromVolume( new Volume() )
		
		await clone( { fs, http, dir: '/', url: project.repository, ref: project.branch, singleBranch: true, depth: 1 } )
		
		const yaml = await fs.promises.readFile( '/riser.yml', 'utf-8' )
		const config = load( yaml )
		console.log( config.riser )

		await database.Function.deleteMany( { name: project.name } )
		
		let all = ''
		
		for ( let app in config.riser[ 'view' ] ) {
			const { path, handler, packages } = config.riser[ 'view' ][ app ]
			const source = await fs.promises.readFile( handler, 'utf-8' )
			all += source
			all += `exports.config[ '${path}' ] = '${app}';`
		}

		const { code } = transform( all, { presets: [ 'es2015', 'react' ] } )
		await database.Function.create( { name: project.name, type: 'view', code: `const exports = { config: {} };\n${code}` } ) 
		
		Object.keys( config.riser[ 'gateway' ] ).map( async app => {
			const { path, handler, packages } = config.riser[ 'gateway' ][ app ]
			const source = await fs.promises.readFile( handler, 'utf-8' )
			const { code } = transform( source, { presets: [ 'es2015' ] } )
			await database.Function.create( { name: project.name, path, type: 'gateway', packages, code: `(function a() {${code} return exports.register(params)})()` } ) 
		} )
		
		res.json( {} )

	} catch ( error ) {

		console.error( error )
		res.json( { error } )

	}

}