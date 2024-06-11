export async function API( database, req, res ) {
	console.log( req.path.split( '/' ) )
	res.json( { path: req.path.split( '/' ) } )
}
