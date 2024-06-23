import React, { useEffect, useState } from 'react'
import { Box, Row, Col, Table, Button, Text } from '../ui'
import { useNavigate, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Theme } from '../services/theme'

function Link( { path, icon } ) {
  const { dark, light } = Theme()
  const [ hover, setHover ] = useState( false)
  const navigate = useNavigate( )
  const location = useLocation( )
  return ( 
    <FontAwesomeIcon
      icon={ icon }
      color={ 'white' }
      size="lg"
      onMouseEnter={() => setHover( true ) }
      onMouseLeave={() => setHover( false ) }
      onClick={ () => location.pathname !== path ? navigate( path ) : null }
      style={{ padding: 12, borderBottom: location.pathname == path ? `3px solid ${light}` : 'none', width: '25%' }}
    />
  )
}

export function Navbar( props ) {
  const navigate = useNavigate( )
  const [ isMobile, setIsMobile ] = useState( window.innerHeight > window.innerWidth )
  const onResize = () => setIsMobile( window.innerHeight > window.innerWidth )
  
  useEffect( ( ) => {
    onResize( )
    window.addEventListener( "resize", onResize )
    return () => window.removeEventListener( "resize", onResize )
  }, [] )

	const { color, light } = Theme()
  const views: any = [
    { path: '/project', icon: 'diagram-project' },
    { path: '/user', icon: 'user' },
  ]

	return (
		<Col background={ color } padding={ '7px 15px 7px 15px' }>
      <Row justify={ 'space-between' } height={ 40 }>
        <Row align={ 'center' }>
          <Text label={ 'Riser Hub' } padding={ 10 } color={ 'white' } size={ 20 } onClick={ () => navigate( '/' )} />
        </Row>
        <Row gap={ 0 }>
          { views.map( ( item, index ) => <Link key={ index } path={ item.path } icon={ item.icon } /> ) }
        </Row>
      </Row>
    </Col>
	)
}