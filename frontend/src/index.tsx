import { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { Box, Row, Col, Input } from './ui'
import { Request } from './services/request'

export default function App() {
	const [ project, setProject ] = useState( 'tester' )
	const [ repository, setRepository ] = useState( 'https:/github.com/siewdass/functions' )
	const [ branch, setBranch ] = useState( 'main' )

	return (
		<Box>
			<Col gap={ 10 }>
				<input type="text" value={ project } onChange={ e => setProject( e.target.value ) } />
				<input type="text" value={ repository } onChange={ e => setRepository( e.target.value ) } />
				<input type="text" value={ branch } onChange={ e => setBranch( e.target.value ) } />
				<button onClick={ () => Request( 'POST', '/project', { project, repository, branch } ) }>Send</button>
			</Col>
		</Box>
	)
}

const root = document.getElementById( 'root' )

if ( root ) ReactDOM.createRoot( root ).render( <App /> )
