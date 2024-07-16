const API = `${location.protocol}//${window.location.hostname}:3000`

export async function Request( method: string, endpoint: string, data: any = {} ) {
	try {
		const response = await fetch( API + endpoint, {
			method,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${localStorage.getItem( 'token' )}`
			},
			... method !== 'GET' ? { body: JSON.stringify( data ) } : null
		} )
		const res = await response.json( )
		console.log( method, endpoint, data, res )
		return res
	} catch ( err ) {
		console.error( method, endpoint, data, err )
		return null
	}
}