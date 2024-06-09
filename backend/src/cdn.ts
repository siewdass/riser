export async function CDN( database, req, res ) {
	res.setHeader( 'Content-Type', 'text/javascript' )
	res.send( `console.log('${ req.query.project }')` )
}
