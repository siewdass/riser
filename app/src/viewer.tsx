import React, { useEffect, useState } from 'react'
import { Box, Row, Col, Table, Button, Text, notify, Notification } from './ui'
import { Navbar, Loader, Header } from './components'

const html = `<!DOCTYPE html><html><head><script type="text/javascript">const id = '${ 'cc36baaf-a634-474f-8b02-37e95b7cf8dd' }'</script></head><body><div id="root"></div><script src="https://riser.ddns.net:3000/runtime.js"></script></body></html>`

export function Viewer() {
	const [ page, setPage ] = useState( '' )


	return (
		<Box >
			<Navbar router={ 'viewer' } />

						
			<button onClick={ () => notify('XD') }>Show</button>


			<Notification />
		</Box>
	)
}