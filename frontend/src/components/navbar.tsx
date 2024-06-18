import React, { useEffect, useState } from 'react'
import { Box, Row, Col, Table, Button, Text } from '../ui'
import { useNavigate, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Theme } from '../services/theme'

function Link( { path, icon } ) {
  const { dark } = Theme()
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
      style={{ padding: 9, borderBottom: location.pathname == path ? `2px solid ${dark}` : 'none', width: '25%' }}
    />
  )
}

export function Navbar( props ) {

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
    { path: '/database', icon: 'database' },
    { path: '/project2', icon: 'terminal' },
    { path: '/project3', icon: 'chart-simple' },
    { path: '/project4', icon: 'user' },
  ]

	return (
		<Col background={ color } padding={ '7px 25px 7px 25px' }>
      <Row justify={ 'space-between' } height={ 40 }>
        <Row align={ 'center' }>
          <Text label={ 'Project' } padding={ 10 } color={ 'white' } size={ 20 }/>
        </Row>
        { !isMobile ? 
          <Row justify={ 'space-between' } gap={ 50 }>
            { views.map( ( item, index ) => <Link key={ index } path={ item.path } icon={ item.icon } /> ) }
          </Row> : null
        }
        { props.actions ? props.actions : null }
      </Row>
      { isMobile ? 
        <Row justify={ 'space-between' } gap height={ 40 } margin={ '0px -25px -7px -25px' }>
          { views.map( ( item, index ) => <Link key={ index } path={ item.path } icon={ item.icon } /> ) }
        </Row> : null
      }
    </Col>
	)
}