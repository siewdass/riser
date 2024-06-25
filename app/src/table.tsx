import React, { useEffect, useState } from 'react'
import { Box, Row, Col, Table as T, Button, Text, Grow, Dialog } from './ui'
import { Request } from './services/request'
import { Input } from './ui/input'
import { useForm } from './library/form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Theme } from './services/theme'

import { Navbar, Loader, Header } from './components'

export function Table() {
	const [ params ] = useSearchParams( )
	const navigate = useNavigate( )
	const { color, light, dark } = Theme()
	const [ view, setView ] = useState( 'create' )
	const [ loading, setLoading ] = useState( true )
	const [ dialog, setDialog ] = useState( false )
	const [ selected, setSelected ] = useState< any >( {} )
	const [ collection, setCollection ] = useState( [] )
	const project = params.get( 'project' )
	const table = params.get( 'table' )

	const [ create, onCreate ] = useForm( {
		name: { type: 'text', required: { value: true, message: 'Required' } }
	} )

	const getTable = async ( ) => {
		setLoading( true )
		const response = await Request( 'POST', '/table/data', { project, table } )
		if ( response?.data?.length > 0 ) {
			setCollection( response.data )
			setView( 'table' )
		} else {
			setView( 'create' )
		}
		setTimeout( () => setLoading( false ), 500 )
	}

	useEffect( () => {
		if ( localStorage.getItem( 'token' ) === null ) navigate( '/user' )
		getTable( )
	}, []) 

	const form: any = [ 'name' ]

	const header = {
		left: [
			{ icon: 'angle-left', color, size: 'xl', onClick: () => {
				if ( view === 'create' ) {
					if ( collection?.length === 0 ) navigate( '/project' )
					else setView( 'database' )
				} else {
					navigate( '/project' )
				}
			} }
		],
		right: [
			{ icon: 'trash', color: color, size: 'lg', onClick: () => setDialog( true ) }
		] 
	}

	return (
		<Box>
			<Navbar router={ 'database' } />

			{ loading ? <Loader /> : 
				<Col grow padding={ 15 } gap={ 20 } style={ view !== 'create' ? { overflowY: 'scroll' } : null }>
					<Header
						label={ view === 'create' ? 'Create new index' : 'Table' }
						left={ header.left }
						right={ view !== 'create' ? header.right : null }
					/>
					{ view === 'create' ?
						<>
							{ form.map( ( item, index ) => <Input key={ index } name={ item } form={ create } /> ) }
							<Grow />
							<Button label={ 'Create' } onClick={ () => {} } /> 
						</> :
						<T data={ collection } />
					} 
				</Col> 
			}

		</Box>
	)
}