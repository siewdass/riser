export async function API( database, req, res ) {
	console.log( req.path )
	res.json( { path: req.path.split( '/' ) } )
}
