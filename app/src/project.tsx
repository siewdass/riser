import React, { useEffect, useState, useMemo } from 'react'
import { Box, Row, Col, Table, Button, Text, Dialog, Accordion, Grow } from './ui'
import { Request } from './services/request'
import { Input } from './ui/input'
import { useForm } from './library/form'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Theme } from './services/theme'

import { Navbar, Loader, Header } from './components'

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

	const createProject = async data => {
    const response = await Request( 'POST', '/project/create', data )
		if ( !response.error ) {
			getProjects( )
			setView( 'project' )
		}
	}

	const deleteProject = async ( ) => {
    const response = await Request( 'POST', '/project/delete', { name: selected.name } )
		if ( !response.error ) getProjects()
	}

	const form: any = [ 'repository', 'branch', 'username', 'token' ]

	const header = useMemo( () => ( {
		left: [
			{ icon: 'angle-left', color, size: 'xl', onClick: () => {
				if ( view === 'create' ) {
					if ( projects?.length === 0 ) navigate( '/' )
					else setView( 'projects' )
				} else {
					navigate( '/' )
				}
			} }
		],
		right: [
			{ icon: 'square-plus', color: color, size: 'xl', onClick: () => setView( 'create' ) },
			{ icon: 'trash', color: selected ? color : dark, size: 'lg', onClick: () => selected ? setDialog( true ) : null }
		]
	} ), [ view, selected, color ] )

	const actions =  [
		{ icon: 'database', onClick: () => selected ? navigate( `/database?project=${selected.id}` ) : null },
		{ icon: 'cloud-arrow-up', onClick: () => {} },
		{ icon: 'window-maximize',  onClick: () => {} },
		{ icon: 'chart-pie',  onClick: () => {} },
		{ icon: ['fab', 'github'],  onClick: () => {} },
	]

	const download = `<!DOCTYPE html><html><head><script>const id = 'ID'</script></head><body><div id="root"></div><script src="http://localhost:3000/runtime.js"></script></body></html>`
	//.replace("ID", selected?.id )
	return (
		<Box>
			<Navbar router={ 'project' } />

			{ loading ? <Loader /> : 
				<Col grow padding={ 15 } gap={ 20 } style={ view !== 'create' ? { overflowY: 'scroll' } : null }>
					<Header
						label={ view === 'create' ? 'Create new project' : 'Project' }
						left={ header.left }
						right={ view !== 'create' ? header.right : null }
					/>
					{ view === 'create' ?
						<>
							{ [ 'name', ...form ].map( ( item, index ) => <Input key={ index } name={ item } form={ create } /> ) }
							<Grow />
							<Button label={ 'Create' } onClick={ onCreate( createProject ) } /> 
						</> :
						<>
							{ projects?.map( ( data: any, index ) =>
								<Col key={ index } padding={ '15px 20px 15px 20px' } radius={ 10 } border={ `1px solid ${ data.name === selected?.name ? color : dark }` } onClick={ () => setSelected( data ) }>
									<Row justify={ 'space-between' } style={{ borderBottom: `1px solid ${ data.name === selected?.name ? color : dark }`, paddingBottom: 15, marginBottom: 10 }}>
										<Text label={ data.name } transform={ 'uppercase' } />
										<Row align={ 'center' } gap={ 20 } style={ { display: data.name === selected?.name ? 'flex' : 'none', opacity: data.name === selected?.name ? 1 : 0, transition: 'opacity .1s linear' } }>
											{ ( actions as any ).map( ( item, index ) => 
												<FontAwesomeIcon key={ index } icon={ item.icon } color={ color } size={ 'lg' } onClick={ item.onClick } />
											) }
										</Row>
									</Row>
									{ form.map( ( item, index ) => 
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
				title={ `Delete project ${ selected?.name }?` }
				onAccept={ deleteProject } 
				onClose={ setDialog } 
			/>

		</Box>
	)
}

