import React, { useEffect, useState } from 'react'
import { Box, Row, Col, Table, Button, Text, Grow, Dialog } from './ui'
import { Request } from './services/request'
import { Input } from './ui/input'
import { useForm } from './library/form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Theme } from './services/theme'

import { Navbar, Loader, Header } from './components'

export function Database() {
	const [ params ] = useSearchParams( )
	const navigate = useNavigate( )
	const { color, light, dark } = Theme()
	const [ view, setView ] = useState( 'create' )
	const [ loading, setLoading ] = useState( true )
	const [ dialog, setDialog ] = useState( false )
	const [ selected, setSelected ] = useState< any >( null )
	const [ database, setDatabase ] = useState( [] )
	const project = params.get( 'project' )

	const [ create, onCreate ] = useForm( {
		name: { type: 'text', required: { value: true, message: 'Required' } }
	} )

	const getTables = async ( ) => {
		setLoading( true )
		const response = await Request( 'POST', '/table/read', { id: project } )
		if ( response?.data?.length > 0 ) {
			setDatabase( response.data )
			setView( 'tables' )
		} else {
			setView( 'create' )
		}
		setTimeout( () => setLoading( false ), 500 )
	}

	useEffect( () => {
		if ( localStorage.getItem( 'token' ) === null ) navigate( '/user' )
		getTables( )
	}, []) 

	const form: any = [ 'name' ]

	const header = {
		left: [
			{ icon: 'angle-left', color, size: 'xl', onClick: () => {
				if ( view === 'create' ) {
					if ( database?.length === 0 ) navigate( '/project' )
					else setView( 'database' )
				} else {
					navigate( '/project' )
				}
			} }
		],
		right: [
			{ icon: 'square-plus', color: color, size: 'xl', onClick: () => setView( 'create' ) },
			{ icon: 'table', color: selected?.indexes > 0 ? color : dark, size: 'lg', onClick: () => selected ? navigate( `/table?project=${ project }&table=${ selected?.table }` ) : null },
			{ icon: 'trash', color: color, size: 'lg', onClick: () => setDialog( true ) }
		] 
	}

	const createTable = async data => {
    const response = await Request( 'POST', '/table/create', { id: project, table: data.name } )
		if ( !response?.error ) getTables( )
	}
	
	const deleteTable = async ( ) => {
    const response = await Request( 'POST', '/table/delete', { id: project, table: selected?.table } )
		if ( !response?.error ) getTables( )
	}

	return (
		<Box>
			<Navbar router={ 'database' } />

			{ loading ? <Loader /> : 
				<Col grow padding={ 15 } gap={ 20 } style={ view !== 'create' ? { overflowY: 'scroll' } : null }>
					<Header
						label={ view === 'create' ? 'Create new table' : 'Database' }
						left={ header.left }
						right={ view !== 'create' ? header.right : null }
					/>
					{ view === 'create' ?
						<>
							{ form.map( ( item, index ) => <Input key={ index } name={ item } form={ create } /> ) }
							<Grow />
							<Button label={ 'Create' } onClick={ onCreate( createTable ) } /> 
						</> :
						<>
							{ database?.map( ( data: any, index ) =>
								<Col key={ index } padding={ 15 } radius={ 10 } border={ `1px solid ${ data.table === selected?.table ? color : dark }` } onClick={ () => setSelected( data ) }>
									{ Object.keys( data ).map( ( item, index ) => 
										<Row key={ index }>
											<Text label={ `${item}: ` } color={ color } />
											<Text label={ data[ item ] } max />
										</Row>
									) }
								</Col>
							) }
						</>
					} 
				</Col> 
			}

			<Dialog
				open={ dialog }
				title={ `Delete table ${ selected?.table }?` }
				onAccept={ deleteTable }
				onClose={ setDialog }
			/>

		</Box>
	)
}