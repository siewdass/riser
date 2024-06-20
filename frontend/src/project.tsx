import React, { useEffect, useState } from 'react'
import { Box, Row, Col, Table, Button, Text } from './ui'
import { Request } from './services/request'
import { Input } from './ui/input'
import { useForm } from './library/form'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Theme } from './services/theme'

import { Navbar } from './components/navbar'
import { Loader } from './components/loader'

export function Project() {
	const navigate = useNavigate( )
	const { color, light, dark } = Theme()
	const [ view, setView ] = useState( 'projects' )
	const [ projects, setProjects ] = useState( [] )
	const [ loading, setLoading ] = useState( true )

	const getProjects = async ( ) => {
		const response = await Request( 'GET', '/project/read' )
		if ( response?.data.length > 0 ) {
			setProjects( response.data )
			setTimeout( () => setLoading( false ), 500 )
		} else {
			setView( 'create' )
		}
	}

	useEffect( () => {
		getProjects( )
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
    const response = await Request( 'POST', '/project/create', data )
		if ( !response.error ) {
			getProjects( )
			setView( 'project' )
		}
	}

	return (
		<Box>
			<Navbar
				router={ 'project' }
				actions={
					<Row align={ 'center' }>
						<FontAwesomeIcon
							icon={ view == 'create' ? 'table-list' : 'plus' }
							color={ 'white' }
							size="xl"
							style={ {  } }
							onClick={ () => setView( view == 'create' ? 'projects' : 'create' ) }
						/>
					</Row>
				}
			/>

			{ loading ? <Loader /> : <>{ view === 'create' ? 		
				<Col gap={ 20 } grow padding={ 20 } >
					<Text label={ 'Create new project' } size={ 20 }/>
					<Input name={ 'name' } form={ login } />
					<Input name={ 'repository' } form={ login } />
					<Input name={ 'branch' } form={ login } />
					<Input name={ 'username' } form={ login } />
					<Input name={ 'token' } form={ login }/>
					<div style={{display:'flex', flexGrow: 1}}></div>
					<Button label={ 'Create' } onClick={ onLogin( submit ) } /> 
				</Col> :
				<Col grow padding={ 20 } gap={ 20 } style={{overflow: 'scroll'}}>
					<Text label={ 'Your projects' } size={ 20 }/>
					{ projects?.map( ( { name, branch, repository, token, username }, index ) =>
						<Col key={ index } padding={ 15 } radius={ 10 } border={ `.1px solid ${dark}` }>
							<Row justify={ 'space-between' } style={{ borderBottom: `.1px solid ${dark}`, paddingBottom: 15, marginBottom: 10 }}>
								<Text label={ name } transform={ 'uppercase' } />
								<Row >
									<FontAwesomeIcon icon={ 'square-plus' } color={ color } size="xl" onClick={ () => {} } />
									<FontAwesomeIcon icon={ 'square-minus' } color={ color } size="xl" onClick={ () => {} } />
								</Row>
							</Row>
							<Row>
								<Text label={ 'Branch: ' } color={ color } />
								<Text label={ branch } transform={ 'lowercase' } max />
							</Row>
							<Row>
								<Text label={ 'Repository: ' } color={ color } /><Text label={ repository } transform={ 'lowercase' } max /></Row>
							<Row><Text label={ 'Username: ' } color={ color } /><Text label={ username } transform={ 'lowercase' } max /></Row>
							<Row><Text label={ 'Token: ' } color={ color } /><Text label={ token } max /></Row>
						</Col>
					) }
				</Col>
			}</> }
		</Box>
	)
}

