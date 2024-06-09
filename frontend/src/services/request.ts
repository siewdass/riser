const API = 'http://localhost:3000'

export async function Request( method: string, endpoint: string, body: any = {} ) {
	try {
		const response = await fetch( API + endpoint, {
			method,
			headers: { 'Content-Type': 'application/json' },
			... method !== 'GET' ? { body: JSON.stringify( body ) } : null
		}
		)
		return response.json( )
	} catch ( err ) {
		return err
	}
}