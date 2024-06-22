import React, { useEffect, useState } from 'react'
import { Box, Row, Col, Table, Button, Text } from './ui'
import { Request } from './services/request'
import { Input } from './ui/input'
import { useForm } from './library/form'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Theme } from './services/theme'

import { Navbar } from './components/navbar'
import { Loader } from './components/loader'

export function Database() {
	const [ params ] = useSearchParams( )
	const navigate = useNavigate( )
	const { color, light, dark } = Theme()
	const [ view, setView ] = useState( 'create' )
	const [ loading, setLoading ] = useState( true )
	const [ dialog, setDialog ] = useState( false )
	const [ database, setDatabase ] = useState( [] )
	const project = params.get( 'project' )

	const [ create, onCreate ] = useForm( {
		name: { type: 'text', required: { value: true, message: 'Required' } }
	} )

	const getTables = async ( ) => {
		setLoading( true )
		const response = await Request( 'POST', '/database/read', { project } )
		if ( response?.data?.length > 0 ) {
			setDatabase( response.data )
		} else {
			setView( 'create' )
		}
		setTimeout( () => setLoading( false ), 500 )
	}

	useEffect( () => {
		getTables( )
	}, []) 


	useEffect( () => {
		if ( localStorage.getItem( 'token' ) === null ) navigate( '/user' )
 	}, [])

	const form: any = [ 'name' ]

	const createTable = async data => {
    const response = await Request( 'POST', '/database/create', { project, ...data } )
		if ( !response.error ) {
			getTables( )
		}
	}

	return (
		<Box>
			<Navbar router={ 'database' } />

			{ loading ? <Loader /> : <>{ view === 'create' ?

			<Col gap={ 20 } grow padding={ 20 }>
				<Text label={ 'Create new table' } size={ 20 }/>
				{ form.map( ( item, index ) => <Input key={ index } name={ item } form={ create } /> ) }
				<div style={ { display:'flex', flexGrow: 1 } }></div>
				<Button label={ 'Create' } onClick={ onCreate( createTable ) } /> 
			</Col> :

			<Col grow padding={ '15px 20px 15px 20px' } gap={ 20 } style={{overflowY: 'scroll'}}>

				<Row align={ 'center' } justify={ 'space-between' } padding={ '0px 10px 0px 10px' }>
					<Text label={ 'Project' } size={ 20 }/>
					<Row gap={ 30 } align={ 'center' }>
						<FontAwesomeIcon icon={ 'square-plus' } color={ color } size="xl" onClick={ () => {} }/>
						<FontAwesomeIcon icon={ 'trash' } color={ color } size="lg" onClick={ () => {} } />
					</Row>
				</Row>

				{ database?.map( ( data: any, index ) =>
					<Col key={ index } padding={ 15 } radius={ 10 } border={ `1px solid ${ dark }` } onClick={ () => {} }>
						<Row justify={ 'space-between' } style={{ borderBottom: `1px solid ${ dark }`, paddingBottom: 15, marginBottom: 10 }}>
							<Text label={ data.name } transform={ 'uppercase' } />
						</Row>
						{ form.shift( ) && form.map( ( item, index ) => 
							<Row key={ index }>
								<Text label={ `${item}: ` } color={ color } />
								<Text label={ data[ item ] } max />
							</Row>
						) }
					</Col>
				) }

			</Col>
			}</> }

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