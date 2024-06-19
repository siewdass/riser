import React, { useEffect, useState } from 'react'
import { Box, Row, Col, Table, Button, Text } from './ui'
import { Request } from './services/request'
import { Input } from './ui/input'
import { useForm } from './library/form'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Theme } from './services/theme'

import { Navbar } from './components/navbar'

export function Project() {
	const navigate = useNavigate( )
	const { color, light } = Theme()
	const [ view, setView ] = useState( 'create' )
	const [ projects, setProjects ] = useState( [] )
	const [ reload, setReload ] = useState( 0 )

	const get = async ( ) => {
		const response = await Request( 'GET', '/project/read' )
		setProjects( response.data )
	}

	useEffect( () => {
		get( )
	}, []) 

	const [ login, onLogin ] = useForm( {
		name: { type: 'text', required: { value: true, message: 'Required' } },
		repository: { type: 'text', required: { value: true, message: 'Required' } },
		branch: { type: 'text', required: { value: true, message: 'Required' } },
		username: { type: 'text', required: { value: true, message: 'Required' } },
		token: { type: 'text', required: { value: true, message: 'Required' } },
	} )

	useEffect( () => {
		//localStorage.clear( )
		if ( localStorage.getItem( 'token' ) === null ) navigate( '/user' )
 	}, [])

	const submit = async data => {
    //const response = await Request( 'POST', '/project/create', data )
		//console.log( data, response )
	}

	return (
		<Box>
			<Navbar
				router={ 'project' }
				actions={
					<Row align={ 'center' }>
						<FontAwesomeIcon
							icon={ view == 'create' ? 'list' : 'plus' }
							color={ 'white' }
							size="xl"
							style={ { width: '30px',padding: '3px' } }
							onClick={ () => setView( view == 'create' ? 'list' : 'create' ) }
						/>
					</Row>
				}
			/>

			{ view === 'create' ? 		
				<Col gap={ 20 } grow padding={ 20 }>
					<Text label={ 'Create new project' } size={ 20 }/>
					<Input name={ 'name' } form={ login } />
					<Input name={ 'repository' } form={ login } />
					<Input name={ 'branch' } form={ login } />
					<Input name={ 'username' } form={ login } />
					<Input name={ 'token' } form={ login }/>
					<div style={{display:'flex', flexGrow: 1}}></div>
					<Button label={ 'Create' } onClick={ onLogin( submit ) } /> 
				</Col> :
				<>
					{ projects.map( ( item: any, index )=> <div key={ index }>{ item?.name }</div> ) }
				</>
			}
		</Box>
	)
}

