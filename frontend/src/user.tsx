import React, { useEffect, useState } from 'react'
import { Box, Row, Col, Table, Button, Text } from './ui'
import { Request } from './services/request'
import { Input } from './ui/input'
import { useForm } from './library/form'
import { useNavigate } from 'react-router-dom'

export function User() {
	const navigate = useNavigate( )
	const [ view, setView ] = useState( false )

	const [ login, onLogin ] = useForm( {
		email: {
			type: 'email',
			autocomplete: "off",
			required: { value: true, message: 'Required' },
			pattern: { value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, message: 'Invalid Email' }
		},
		password: {
			type: 'password',
			autocomplete: "off",
			required: { value: true, message: 'Required' },
			minLength: { value: 6, message: 'Min 6 characters' }
		},
		'repeat password': {
			type: 'password',
			required: { value: true, message: 'Required' },
			validate: value => value === login.getValues( 'password' ) || 'Not match' 
		}
	} )

	useEffect( ()=> {
		if ( localStorage.getItem( 'token' ) !== null ) navigate( '/project' )
 	}, [])

	const submit = async data => {
		const res = await Request( 'POST', `/account/${ !view ? 'login': 'register' }`, data )
		console.log( data, res )
		
		if ( !view && res.token ) {
			localStorage.setItem( 'token', res.token )
			navigate( '/project' )
		} else if ( view && !res.error ) {
			setView( !view )
		}
 	}

	return (
		<Box padding={ 15 }>
			<Col height justify={ 'space-between' }>

				<Col>
					<Text label={ 'Riser Hub' } size={ 40 } center/>
					<Text label={ 'Cloud Function' } center/>
				</Col>

				<Col gap={ 12 } justify={ 'center' }>
					<Input name={ 'email' } form={ login } />
					<Input name={ 'password' } form={ login } />
					{ view ? <Input name={ 'repeat password' } form={ login } /> : null }
				</Col>

				<Col gap={ 12 }>
					<Text label={ view ? 'Already have account?' : 'Dont have account?' } onClick={ () => setView( !view )  } center/>
					<Button label={ view ? 'Register' : 'Login' } onClick={ onLogin( submit ) }/> 
				</Col>

			</Col>
		</Box>
	)
}