import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

export async function Register( database, req, res ) {

	try {

		const email = req.body.email
		const account = await database.Account.findOne( { email } )

		if ( account ) throw 'Account already exist.'

		const salt = await bcrypt.genSalt( 10 )
		const password = await bcrypt.hash( req.body.password, salt )
		
		await database.Account.create( { email, password } )

	} catch ( error ) {

		console.error( error )
		res.json( { error } )

	} 
	
}

export async function Login( database, req, res ) {

	try {
		
		const email = req.body.email
		const account = await database.Account.findOne( { email } )
		if ( !account ) throw 'Account not exist.'

		const match = await bcrypt.compare( req.body.password, account.password )
		if ( !match ) throw 'Password not match.'
    
		const now = new Date( )
		const expiration = new Date( now.getTime( ) + 60000 * 60 )
		const token = await jwt.sign( { email, expiration, }, process.env.SECRET_KEY, { expiresIn: '12h' } )

		res.json( { token } )
  
	} catch ( error ) {

		console.error( error )
		res.json( { error } )

	} 

}

export async function Authorization( database, req, res, next ) {

	try {

		if ( ![ '/account/login', '/account/register' ].includes( req.path ) ) {
			const token = req.headers.authorization.split( ' ' )[ 1 ]
			if ( !token ) throw 'Not Authorized.'
	
			const { email } = await jwt.verify( token, process.env.SECRET_KEY )
			if ( !email ) throw 'Not Authorized.'
	
			const account = await database.Account.findOne( { email } )
			if ( !account ) throw 'Not Authorized.'
	
			req.body[ 'email' ] = email
		}

		next( )

	} catch ( error ) {

		console.error( error )
		res.status( 401 ).send( error )

	} 

}