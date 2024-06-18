import React, { useEffect, useState } from 'react'
import { Box, Row, Col, Table, Button, Text } from './ui'
import { Request } from './services/request'
import { Input } from './ui/input'
import { useForm } from './library/form'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Theme } from './services/theme'

import { Navbar } from './components/navbar'

export function Database() {
	const navigate = useNavigate( )
	const { color, light } = Theme()
	const [ view, setView ] = useState( 'create' )

	useEffect( () => {
		//localStorage.clear( )
		if ( localStorage.getItem( 'token' ) === null ) navigate( '/user' )
 	}, [])

	return (
		<Box>
			<Navbar
				router={ 'project' }
				actions={
					<Row align={ 'center' }>
						<FontAwesomeIcon
							icon={ 'plus' }
							color={ 'white' }
							size="xl"
							style={ { width: '30px',padding: '3px' } }
							onClick={ () => setView( view == 'create' ? 'list' : 'create' ) }
						/>
					</Row>
				}
			/>
			d
		</Box>
	)
}

/*
const rows = [ 
	{ label: 'name' },
	{ label: 'age' },
	{ label: 'sex' }
]

const columns = [
	{ dada: 1, name: 'sam', age: 34, sex: 'male' },
	{ name: 'dan', color: 1, age: 31, sex: 'female' }
]
<Table rows={ rows } columns={ columns } />
*/

/*
<select>
	<option value="">Open this select menu</option>
	<option value="">GitHub</option>
	<option value="">Instagram</option>
	<option value="">Facebook</option>
	<option value="">LinkedIn</option>
	<option value="">Twitter</option>
	<option value="">Reddit</option>
</select>
*/