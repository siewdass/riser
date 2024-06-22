import React, { useEffect, useState } from 'react'
import { Box, Row, Col, Table, Button, Text, Dialog } from './ui'
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
	const [ dialog, setDialog ] = useState( false )
	const [ selected, setSelected ] = useState< any >( null )

	const getProjects = async ( ) => {
		setLoading( true )
		const response = await Request( 'GET', '/project/read' )
		if ( response?.data.length > 0 ) {
			setProjects( response.data )
		} else {
			setView( 'create' )
		}
		setTimeout( () => setLoading( false ), 500 )
	}

	useEffect( () => {
		getProjects( )
	}, []) 

	const [ create, onCreate ] = useForm( {
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

	const onDelete = async ( ) => {
    const response = await Request( 'POST', '/project/delete', { name: selected.name } )
		if ( !response.error ) getProjects()
		setDialog( false )
	}

	const form: any = [ 'name', 'repository', 'branch', 'username', 'token' ]

	return (
		<Box>
			<Navbar router={ 'project' } />

			{ loading ? <Loader /> : <>{ view === 'create' ?

				<Col gap={ 20 } grow padding={ 20 }>
					<Text label={ 'Create new project' } size={ 20 }/>
					{ form.map( ( item, index ) => <Input key={ index } name={ item } form={ create } /> ) }
					<div style={ { display:'flex', flexGrow: 1 } }></div>
					<Button label={ 'Create' } onClick={ onCreate( submit ) } /> 
				</Col> :

				<Col grow padding={ '15px 20px 15px 20px' } gap={ 20 } style={{overflowY: 'scroll'}}>

					<Row align={ 'center' } justify={ 'space-between' } padding={ '0px 10px 0px 10px' }>
						<Text label={ 'Project' } size={ 20 }/>
						<Row gap={ 30 } align={ 'center' }>
							<FontAwesomeIcon icon={ 'square-plus' } color={ color } size="xl" onClick={ () => setView( 'create' ) }/>
							<FontAwesomeIcon icon={ 'database' } color={ color } size="lg" onClick={ () => selected ? navigate( `/database?project=${selected.name}` ) : null } />
							<FontAwesomeIcon icon={ 'trash' } color={ color } size="lg" onClick={ () => selected ? setDialog( true ) : null } />
						</Row>
					</Row>

					{ projects?.map( ( data: any, index ) =>
						<Col key={ index } padding={ 15 } radius={ 10 } border={ `1px solid ${ data.name === selected?.name ? color : dark }` } onClick={ () => setSelected( data ) }>
							<Row justify={ 'space-between' } style={{ borderBottom: `1px solid ${ data.name === selected?.name ? color : dark }`, paddingBottom: 15, marginBottom: 10 }}>
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

			<Dialog open={ dialog } onClose={ setDialog } title={ 'Delete this project?' }>
				<Row>
					<Button label={ 'Accept' } onClick={ () => onDelete( ) } />
					<Button label={ 'Close' } onClick={ () => setDialog( false ) } />
				</Row>
			</Dialog>

		</Box>
	)
}

